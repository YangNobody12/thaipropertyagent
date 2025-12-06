"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

interface UseElevenLabsOptions {
    autoPlay?: boolean;
    onPlayStart?: () => void;
    onPlayEnd?: () => void;
    onError?: (error: string) => void;
}

interface UseElevenLabsReturn {
    speak: (text: string) => Promise<void>;
    stop: () => void;
    isPlaying: boolean;
    isLoading: boolean;
    error: string | null;
    isEnabled: boolean;
    toggleEnabled: () => void;
}

export function useElevenLabs({
    autoPlay = true,
    onPlayStart,
    onPlayEnd,
    onError,
}: UseElevenLabsOptions = {}): UseElevenLabsReturn {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEnabled, setIsEnabled] = useState(true);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    const generateTTS = useAction(api.tts.generate);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }
        setIsPlaying(false);
    }, []);

    const speak = useCallback(
        async (text: string) => {
            if (!isEnabled || !text.trim()) {
                return;
            }

            // Stop any currently playing audio
            stop();

            setIsLoading(true);
            setError(null);

            try {
                // Call Convex action to generate speech
                const result = await generateTTS({ text });

                if (!result?.audio) {
                    throw new Error("No audio data received");
                }

                // Create audio from base64
                const audioData = `data:${result.contentType};base64,${result.audio}`;
                const audio = new Audio(audioData);
                audioRef.current = audio;

                // Set up event listeners
                audio.onplay = () => {
                    setIsPlaying(true);
                    setIsLoading(false);
                    onPlayStart?.();
                };

                audio.onended = () => {
                    setIsPlaying(false);
                    audioRef.current = null;
                    onPlayEnd?.();
                };

                audio.onerror = () => {
                    const errorMsg = "เกิดข้อผิดพลาดในการเล่นเสียง (Audio playback error)";
                    setError(errorMsg);
                    setIsPlaying(false);
                    setIsLoading(false);
                    onError?.(errorMsg);
                };

                // Play the audio
                if (autoPlay) {
                    await audio.play();
                }
            } catch (err) {
                const errorMsg =
                    err instanceof Error
                        ? err.message
                        : "เกิดข้อผิดพลาดในการสร้างเสียง (TTS generation error)";
                setError(errorMsg);
                setIsLoading(false);
                onError?.(errorMsg);
            }
        },
        [isEnabled, autoPlay, generateTTS, stop, onPlayStart, onPlayEnd, onError]
    );

    const toggleEnabled = useCallback(() => {
        setIsEnabled((prev) => {
            if (prev) {
                // Turning off - stop any playing audio
                stop();
            }
            return !prev;
        });
    }, [stop]);

    return {
        speak,
        stop,
        isPlaying,
        isLoading,
        error,
        isEnabled,
        toggleEnabled,
    };
}

// Queue-based TTS for handling multiple messages
export function useElevenLabsQueue({
    onError,
}: { onError?: (error: string) => void } = {}) {
    const [queue, setQueue] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const elevenlabs = useElevenLabs({
        onPlayEnd: () => {
            // Process next in queue when current finishes
            setQueue((prev) => prev.slice(1));
        },
        onError,
    });

    // Process queue
    useEffect(() => {
        if (queue.length > 0 && !elevenlabs.isPlaying && !elevenlabs.isLoading && !isProcessing) {
            setIsProcessing(true);
            elevenlabs.speak(queue[0]).finally(() => {
                setIsProcessing(false);
            });
        }
    }, [queue, elevenlabs]);

    const addToQueue = useCallback((text: string) => {
        if (text.trim()) {
            setQueue((prev) => [...prev, text]);
        }
    }, []);

    const clearQueue = useCallback(() => {
        setQueue([]);
        elevenlabs.stop();
    }, [elevenlabs]);

    return {
        ...elevenlabs,
        addToQueue,
        clearQueue,
        queueLength: queue.length,
    };
}


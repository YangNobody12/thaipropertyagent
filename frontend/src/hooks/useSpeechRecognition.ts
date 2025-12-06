"use client";

import { useState, useCallback, useEffect, useRef } from "react";

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    onstart: (() => void) | null;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}

interface UseSpeechRecognitionOptions {
    language?: string;
    continuous?: boolean;
    interimResults?: boolean;
    onResult?: (transcript: string, isFinal: boolean) => void;
    onError?: (error: string) => void;
}

interface UseSpeechRecognitionReturn {
    transcript: string;
    interimTranscript: string;
    isListening: boolean;
    isSupported: boolean;
    startListening: () => void;
    stopListening: () => void;
    resetTranscript: () => void;
    error: string | null;
}

export function useSpeechRecognition({
    language = "th-TH", // Default to Thai
    continuous = false,
    interimResults = true,
    onResult,
    onError,
}: UseSpeechRecognitionOptions = {}): UseSpeechRecognitionReturn {
    const [transcript, setTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const recognitionRef = useRef<SpeechRecognition | null>(null);

    // Check browser support on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognitionAPI =
                window.SpeechRecognition || window.webkitSpeechRecognition;
            setIsSupported(!!SpeechRecognitionAPI);

            if (SpeechRecognitionAPI) {
                const recognition = new SpeechRecognitionAPI();
                recognition.continuous = continuous;
                recognition.interimResults = interimResults;
                recognition.lang = language;
                recognitionRef.current = recognition;
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, [continuous, interimResults, language]);

    // Update language when it changes
    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = language;
        }
    }, [language]);

    const startListening = useCallback(() => {
        if (!recognitionRef.current) {
            const errorMsg = "Speech recognition is not supported in this browser";
            setError(errorMsg);
            onError?.(errorMsg);
            return;
        }

        setError(null);
        setInterimTranscript("");

        const recognition = recognitionRef.current;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscript = "";
            let interim = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                const transcriptText = result[0].transcript;

                if (result.isFinal) {
                    finalTranscript += transcriptText;
                } else {
                    interim += transcriptText;
                }
            }

            if (finalTranscript) {
                setTranscript((prev) => prev + finalTranscript);
                onResult?.(finalTranscript, true);
            }

            setInterimTranscript(interim);
            if (interim) {
                onResult?.(interim, false);
            }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            let errorMessage = "Speech recognition error";

            switch (event.error) {
                case "no-speech":
                    errorMessage = "ไม่พบเสียงพูด (No speech detected)";
                    break;
                case "audio-capture":
                    errorMessage = "ไม่พบไมโครโฟน (No microphone found)";
                    break;
                case "not-allowed":
                    errorMessage = "กรุณาอนุญาตการใช้ไมโครโฟน (Please allow microphone access)";
                    break;
                case "network":
                    errorMessage = "เครือข่ายมีปัญหา (Network error)";
                    break;
                case "aborted":
                    // User aborted, not really an error
                    setIsListening(false);
                    return;
                default:
                    errorMessage = `ข้อผิดพลาด: ${event.error}`;
            }

            setError(errorMessage);
            setIsListening(false);
            onError?.(errorMessage);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        try {
            recognition.start();
        } catch (e) {
            // Recognition might already be started
            console.warn("Speech recognition start error:", e);
        }
    }, [onResult, onError]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, []);

    const resetTranscript = useCallback(() => {
        setTranscript("");
        setInterimTranscript("");
        setError(null);
    }, []);

    return {
        transcript,
        interimTranscript,
        isListening,
        isSupported,
        startListening,
        stopListening,
        resetTranscript,
        error,
    };
}

// Language options for speech recognition
export const SPEECH_LANGUAGES = {
    thai: "th-TH",
    english: "en-US",
    englishUK: "en-GB",
} as const;

export type SpeechLanguage = keyof typeof SPEECH_LANGUAGES;


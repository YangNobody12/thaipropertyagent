"use client";

import { memo } from "react";

interface VoiceControlsProps {
    isListening: boolean;
    isSpeaking: boolean;
    isSpeakerEnabled: boolean;
    isMicSupported: boolean;
    onMicClick: () => void;
    onSpeakerClick: () => void;
    micError?: string | null;
}

export const VoiceControls = memo(function VoiceControls({
    isListening,
    isSpeaking,
    isSpeakerEnabled,
    isMicSupported,
    onMicClick,
    onSpeakerClick,
    micError,
}: VoiceControlsProps) {
    return (
        <div className="flex items-center gap-2">
            {/* Microphone Button */}
            <button
                type="button"
                onClick={onMicClick}
                disabled={!isMicSupported}
                className={`relative p-2.5 rounded-full transition-all btn-thai ${isListening
                    ? "bg-red-500 text-white recording-pulse"
                    : isMicSupported
                        ? "bg-thai-gold/10 text-thai-gold hover:bg-thai-gold/20"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                title={
                    !isMicSupported
                        ? "ไม่รองรับการรับเสียง (Speech recognition not supported)"
                        : isListening
                            ? "หยุดฟัง (Stop listening)"
                            : "เริ่มพูด (Start speaking)"
                }
            >
                {isListening ? (
                    // Recording indicator
                    <div className="flex items-center justify-center w-5 h-5">
                        <div className="flex items-end gap-0.5 h-4">
                            <div className="w-1 bg-white rounded-full sound-wave-bar" style={{ height: "60%" }}></div>
                            <div className="w-1 bg-white rounded-full sound-wave-bar" style={{ height: "100%" }}></div>
                            <div className="w-1 bg-white rounded-full sound-wave-bar" style={{ height: "40%" }}></div>
                            <div className="w-1 bg-white rounded-full sound-wave-bar" style={{ height: "80%" }}></div>
                        </div>
                    </div>
                ) : (
                    // Mic icon
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                    </svg>
                )}
            </button>

            {/* Speaker Button */}
            <button
                type="button"
                onClick={onSpeakerClick}
                className={`relative p-2.5 rounded-full transition-all btn-thai ${isSpeakerEnabled
                    ? isSpeaking
                        ? "bg-thai-gold text-white"
                        : "bg-thai-gold/10 text-thai-gold hover:bg-thai-gold/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                title={
                    isSpeakerEnabled
                        ? "ปิดเสียง (Disable voice output)"
                        : "เปิดเสียง (Enable voice output)"
                }
            >
                {isSpeaking ? (
                    // Playing animation
                    <div className="flex items-center justify-center w-5 h-5">
                        <div className="flex items-end gap-0.5 h-4">
                            <div className="w-1 bg-white rounded-full sound-wave-bar" style={{ height: "50%" }}></div>
                            <div className="w-1 bg-white rounded-full sound-wave-bar" style={{ height: "100%" }}></div>
                            <div className="w-1 bg-white rounded-full sound-wave-bar" style={{ height: "70%" }}></div>
                        </div>
                    </div>
                ) : isSpeakerEnabled ? (
                    // Speaker on
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                ) : (
                    // Speaker off
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                )}
            </button>

            {/* Error tooltip */}
            {micError && (
                <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-red-500 text-white text-xs rounded-lg whitespace-nowrap">
                    {micError}
                    <div className="absolute -bottom-1 left-4 w-2 h-2 bg-red-500 rotate-45"></div>
                </div>
            )}
        </div>
    );
});

// Compact voice indicator for mobile
interface VoiceIndicatorProps {
    isListening: boolean;
    isSpeaking: boolean;
}

export const VoiceIndicator = memo(function VoiceIndicator({
    isListening,
    isSpeaking,
}: VoiceIndicatorProps) {
    if (!isListening && !isSpeaking) return null;

    return (
        <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isListening
                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                : "bg-thai-gold/10 text-thai-gold"
                }`}
        >
            <span className="relative flex h-2 w-2">
                <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isListening ? "bg-red-400" : "bg-thai-gold"
                        }`}
                ></span>
                <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${isListening ? "bg-red-500" : "bg-thai-gold"
                        }`}
                ></span>
            </span>
            {isListening ? "กำลังฟัง..." : "กำลังพูด..."}
        </div>
    );
});

// Language selector for speech recognition
interface LanguageSelectorProps {
    value: string;
    onChange: (language: string) => void;
}

export const LanguageSelector = memo(function LanguageSelector({
    value,
    onChange,
}: LanguageSelectorProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-1.5 text-sm bg-white dark:bg-thai-royal-blue-dark border border-thai-gold/20 rounded-lg text-thai-royal-blue-dark dark:text-thai-cream focus:outline-none focus:ring-2 focus:ring-thai-gold/30"
        >
            <option value="th-TH">🇹🇭 ไทย</option>
            <option value="en-US">🇺🇸 English</option>
        </select>
    );
});


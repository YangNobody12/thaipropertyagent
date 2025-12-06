"use client";

import { memo } from "react";

export interface Message {
    _id?: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp?: number;
}

interface MessageBubbleProps {
    message: Message;
    isLatest?: boolean;
}

export const MessageBubble = memo(function MessageBubble({
    message,
    isLatest = false,
}: MessageBubbleProps) {
    const isUser = message.role === "user";
    const isSystem = message.role === "system";

    if (isSystem) {
        return (
            <div className="flex justify-center my-4 message-animate">
                <div className="px-4 py-2 text-sm text-thai-royal-blue/60 bg-thai-gold/10 rounded-full border border-thai-gold/20">
                    {message.content}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex w-full mb-4 message-animate ${isUser ? "justify-end" : "justify-start"
                }`}
            style={{ animationDelay: isLatest ? "0ms" : "0ms" }}
        >
            {/* Avatar for assistant */}
            {!isUser && (
                <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-thai-gold to-thai-gold-dark flex items-center justify-center shadow-md">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </div>
                </div>
            )}

            <div
                className={`max-w-[75%] md:max-w-[65%] ${isUser ? "order-first" : ""}`}
            >
                {/* Message bubble */}
                <div
                    className={`px-4 py-3 rounded-2xl shadow-md ${isUser
                            ? "bg-gradient-to-br from-thai-royal-blue to-thai-royal-blue-dark text-white rounded-br-md"
                            : "bg-white dark:bg-thai-royal-blue-light/20 text-thai-royal-blue-dark dark:text-thai-cream rounded-bl-md border border-thai-gold/20"
                        }`}
                >
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                    </p>
                </div>

                {/* Timestamp */}
                {message.timestamp && (
                    <div
                        className={`mt-1 text-xs text-thai-royal-blue/40 dark:text-thai-cream/40 ${isUser ? "text-right mr-1" : "text-left ml-1"
                            }`}
                    >
                        {formatTimestamp(message.timestamp)}
                    </div>
                )}
            </div>

            {/* Avatar for user */}
            {isUser && (
                <div className="flex-shrink-0 ml-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-thai-royal-blue to-thai-royal-blue-dark flex items-center justify-center shadow-md">
                        <svg
                            className="w-5 h-5 text-thai-gold"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
});

function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
        return date.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return date.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Typing indicator component
export function TypingIndicator() {
    return (
        <div className="flex justify-start mb-4 message-animate">
            <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-thai-gold to-thai-gold-dark flex items-center justify-center shadow-md">
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                </div>
            </div>
            <div className="px-4 py-3 bg-white dark:bg-thai-royal-blue-light/20 rounded-2xl rounded-bl-md border border-thai-gold/20 shadow-md">
                <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-thai-gold rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-thai-gold rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-thai-gold rounded-full typing-dot"></div>
                </div>
            </div>
        </div>
    );
}


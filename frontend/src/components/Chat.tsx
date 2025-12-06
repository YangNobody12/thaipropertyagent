"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { MessageBubble, TypingIndicator, Message } from "./MessageBubble";
import { VoiceControls, VoiceIndicator } from "./VoiceControls";
import { useSpeechRecognition, SPEECH_LANGUAGES } from "@/hooks/useSpeechRecognition";
import { useElevenLabs } from "@/hooks/useElevenLabs";

// Generate a unique session ID for this browser session
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  
  let sessionId = localStorage.getItem("thai-property-session");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("thai-property-session", sessionId);
  }
  return sessionId;
}

interface ChatProps {
  className?: string;
}

export function Chat({ className = "" }: ChatProps) {
  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [speechLang, setSpeechLang] = useState(SPEECH_LANGUAGES.thai);
  const [sessionId, setSessionId] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Convex queries and mutations
  const conversations = useQuery(
    api.conversations.list,
    sessionId ? { sessionId } : "skip"
  );
  const messages = useQuery(
    api.messages.list,
    conversationId ? { conversationId } : "skip"
  );
  const createConversation = useMutation(api.conversations.create);
  const saveMessage = useMutation(api.messages.save);
  const sendToAI = useAction(api.chat.send);

  // Voice hooks
  const {
    transcript,
    interimTranscript,
    isListening,
    isSupported: isMicSupported,
    startListening,
    stopListening,
    resetTranscript,
    error: micError,
  } = useSpeechRecognition({
    language: speechLang,
    onResult: (text, isFinal) => {
      if (isFinal && text.trim()) {
        setInputValue((prev) => prev + text);
      }
    },
  });

  const {
    speak,
    stop: stopSpeaking,
    isPlaying: isSpeaking,
    isLoading: isTTSLoading,
    isEnabled: isSpeakerEnabled,
    toggleEnabled: toggleSpeaker,
  } = useElevenLabs();

  // Initialize session
  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  // Get or create conversation
  useEffect(() => {
    async function initConversation() {
      if (!sessionId) return;
      
      if (conversations === undefined) return; // Still loading
      
      if (conversations && conversations.length > 0) {
        // Use the most recent conversation
        setConversationId(conversations[0]._id);
      } else if (conversations !== undefined) {
        // Create a new conversation
        const newId = await createConversation({
          sessionId,
          title: "การสนทนาใหม่",
        });
        setConversationId(newId);
      }
    }
    initConversation();
  }, [sessionId, conversations, createConversation]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle sending a message
  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || !conversationId || isTyping) return;

    // Clear input and stop listening
    setInputValue("");
    resetTranscript();
    if (isListening) stopListening();

    try {
      // Save user message
      await saveMessage({
        conversationId,
        role: "user",
        content: text,
      });

      // Show typing indicator
      setIsTyping(true);

      // Build conversation history for context
      const recentMessages = (messages || []).slice(-10).map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      }));

      // Send to AI
      const response = await sendToAI({
        message: text,
        conversationHistory: recentMessages,
        includeProperties: true,
      });

      // Save assistant message
      await saveMessage({
        conversationId,
        role: "assistant",
        content: response.message,
      });

      // Speak the response if enabled
      if (isSpeakerEnabled && response.message) {
        speak(response.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally save an error message
      await saveMessage({
        conversationId,
        role: "assistant",
        content: "ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง (Sorry, an error occurred. Please try again.)",
      });
    } finally {
      setIsTyping(false);
    }
  }, [
    inputValue,
    conversationId,
    isTyping,
    messages,
    saveMessage,
    sendToAI,
    isListening,
    stopListening,
    resetTranscript,
    isSpeakerEnabled,
    speak,
  ]);

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Toggle microphone
  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
  };

  const welcomeMessage: Message = {
    role: "assistant",
    content: `สวัสดีครับ! 🏠 ยินดีต้อนรับสู่ Thai Property Agent

ผมเป็นผู้ช่วยด้านอสังหาริมทรัพย์ไทย พร้อมให้บริการคุณครับ คุณสามารถสอบถามเกี่ยวกับ:

• คอนโด บ้าน หรือวิลล่าในกรุงเทพ เชียงใหม่ หรือภูเก็ต
• ราคาและทำเลที่ตั้ง
• ใกล้ BTS หรือ MRT สถานีไหน

ลองพิมพ์หรือพูดถามได้เลยครับ! 🎤

---

Hello! 🏠 Welcome to Thai Property Agent

I'm your Thai real estate assistant, ready to help you find your perfect property. Feel free to ask about condos, houses, or villas in Bangkok, Chiang Mai, or Phuket!`,
    timestamp: Date.now(),
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-thai-royal-blue to-thai-royal-blue-dark text-white border-b border-thai-gold/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-thai-gold to-thai-gold-dark flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-lg">Thai Property Agent</h1>
            <p className="text-thai-gold-light text-xs">ตัวแทนอสังหาริมทรัพย์ไทย</p>
          </div>
        </div>
        
        <VoiceIndicator isListening={isListening} isSpeaking={isSpeaking || isTTSLoading} />
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 chat-gradient">
        {/* Welcome message when no messages */}
        {(!messages || messages.length === 0) && !isTyping && (
          <MessageBubble message={welcomeMessage} isLatest />
        )}

        {/* Message list */}
        {messages?.map((msg, index) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isLatest={index === messages.length - 1}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        {/* Interim transcript display */}
        {isListening && interimTranscript && (
          <div className="flex justify-end mb-4 opacity-60">
            <div className="max-w-[75%] px-4 py-3 bg-thai-royal-blue/50 text-white rounded-2xl rounded-br-md">
              <p className="text-[15px] italic">{interimTranscript}...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-thai-gold/20 bg-white dark:bg-thai-royal-blue-dark p-3">
        {/* Language selector (only show when mic supported) */}
        {isMicSupported && (
          <div className="flex items-center gap-2 mb-2 text-xs text-thai-royal-blue/60 dark:text-thai-cream/60">
            <span>ภาษา:</span>
            <button
              type="button"
              onClick={() => setSpeechLang(SPEECH_LANGUAGES.thai)}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                speechLang === SPEECH_LANGUAGES.thai
                  ? "bg-thai-gold text-white"
                  : "bg-thai-gold/10 hover:bg-thai-gold/20"
              }`}
            >
              🇹🇭 ไทย
            </button>
            <button
              type="button"
              onClick={() => setSpeechLang(SPEECH_LANGUAGES.english)}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                speechLang === SPEECH_LANGUAGES.english
                  ? "bg-thai-gold text-white"
                  : "bg-thai-gold/10 hover:bg-thai-gold/20"
              }`}
            >
              🇺🇸 EN
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* Voice Controls */}
          <VoiceControls
            isListening={isListening}
            isSpeaking={isSpeaking || isTTSLoading}
            isSpeakerEnabled={isSpeakerEnabled}
            isMicSupported={isMicSupported}
            onMicClick={handleMicClick}
            onSpeakerClick={toggleSpeaker}
            micError={micError}
          />

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                isListening
                  ? "กำลังฟัง... (Listening...)"
                  : "พิมพ์ข้อความ หรือกดไมค์เพื่อพูด..."
              }
              rows={1}
              className="w-full px-4 py-2.5 pr-12 bg-thai-cream dark:bg-thai-royal-blue/30 border border-thai-gold/20 rounded-2xl resize-none text-thai-royal-blue-dark dark:text-thai-cream placeholder-thai-royal-blue/40 dark:placeholder-thai-cream/40 input-focus"
              style={{ minHeight: "44px", maxHeight: "150px" }}
              disabled={isTyping}
            />
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping || !conversationId}
            className={`p-3 rounded-full transition-all btn-thai ${
              inputValue.trim() && !isTyping
                ? "bg-gradient-to-br from-thai-gold to-thai-gold-dark text-white shadow-md hover:shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            }`}
            title="ส่งข้อความ (Send message)"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>

        {/* Mic error display */}
        {micError && (
          <p className="mt-2 text-xs text-red-500">{micError}</p>
        )}
      </div>
    </div>
  );
}


"use client";

import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <div className="min-h-screen thai-pattern-bg flex flex-col">
      {/* Decorative Thai pattern header */}
      <div className="h-1 bg-gradient-to-r from-thai-gold via-thai-royal-blue to-thai-gold"></div>
      
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
        <div className="flex-1 flex flex-col bg-white dark:bg-thai-royal-blue-dark/90 shadow-2xl md:my-4 md:mx-4 md:rounded-2xl overflow-hidden border-x border-thai-gold/10">
          <Chat className="flex-1" />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 text-center text-xs text-thai-royal-blue/50 dark:text-thai-cream/50">
        <div className="flex items-center justify-center gap-2">
          <span>Powered by</span>
          <span className="font-medium text-thai-gold">Convex</span>
          <span>•</span>
          <span className="font-medium text-thai-gold">Smithery AI</span>
          <span>•</span>
          <span className="font-medium text-thai-gold">ElevenLabs</span>
        </div>
      </footer>
    </div>
  );
}

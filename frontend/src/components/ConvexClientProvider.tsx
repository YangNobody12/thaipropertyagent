"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// Create client only if URL exists to avoid build-time errors
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-4 text-center dark:bg-black">
        <h1 className="mb-2 text-2xl font-bold text-red-500">Convex Not Configured</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          The environment variable <code className="bg-gray-100 px-1 py-0.5 rounded dark:bg-gray-800">NEXT_PUBLIC_CONVEX_URL</code> is missing.
        </p>
        <div className="rounded-lg bg-gray-100 p-4 text-left font-mono text-sm dark:bg-gray-900">
          <p className="mb-2 font-semibold">To fix this:</p>
          <ol className="list-decimal pl-4">
            <li className="mb-1">Stop the dev server</li>
            <li className="mb-1">Run <code className="text-blue-600">npx convex dev</code> in the frontend folder</li>
            <li className="mb-1">Log in to Convex when prompted</li>
            <li>Restart the dev server (<code className="text-blue-600">npm run dev</code>)</li>
          </ol>
        </div>
      </div>
    );
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

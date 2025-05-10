"use client";

import { PropsWithChildren, useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { SOCIAL_GITHUB, SOCIAL_FARCASTER } from "@/utils/config";
import { Header } from "./Header";
import Link from "next/link";

export default function Layout({ children }: PropsWithChildren) {
  const { setFrameReady, isFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <Header />

      <div className="w-full max-w-xl mx-auto">
        <main className="flex-1 px-4">{children}</main>

        <footer className="mt-2 mb-4 pt-4 flex justify-center">
          <Link
            href={`https://github.com/${SOCIAL_GITHUB}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
          >
            Built with ❤️ by{" "}
            <Link
              href={`https://warpcast.com/${SOCIAL_FARCASTER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SOCIAL_FARCASTER}
            </Link>
          </Link>
        </footer>
      </div>
    </div>
  );
}

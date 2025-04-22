"use client";

import { PropsWithChildren, useEffect } from "react";
import { useMiniKit, useOpenUrl } from "@coinbase/onchainkit/minikit";
import { SOCIAL_GITHUB } from "@/utils/config";
import { Button } from "./Button";
import { Header } from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <Header />

        <main className="flex-1">{children}</main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl(`https://github.com/${SOCIAL_GITHUB}`)}
          >
            Built with ❤️ by wslyvh
          </Button>
        </footer>
      </div>
    </div>
  );
}

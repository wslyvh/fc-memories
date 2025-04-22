"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { APP_NAME } from "@/utils/config";

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          theme: "mini-app-theme",
          name: APP_NAME,
          logo: "/icon.png",
        },
        wallet: {
          display: "modal",
          supportedWallets: {
            rabby: true,
          },
        },
      }}
    >
      {props.children}
    </MiniKitProvider>
  );
}

import type { Metadata, Viewport } from "next";
import { PropsWithChildren } from "react";
import { APP_URL, APP_NAME, APP_DESCRIPTION } from "@/utils/config";
import Layout from "./components/Layout";
import { Providers } from "./providers";
import "@coinbase/onchainkit/styles.css";
import "./globals.css";
import "./theme.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    other: {
      "fc:frame": JSON.stringify({
        version: "1",
        imageUrl: `${APP_URL}/image.png`,
        button: {
          title: `Launch ${APP_NAME}`,
          action: {
            type: "launch_frame",
            name: APP_NAME,
            url: APP_URL,
            splashImageUrl: `${APP_URL}/splash.png`,
          },
        },
      }),
    },
  };
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}

import { Metadata } from "next";
import { Suspense } from "react";
import { Memory } from "@/components/Memory";
import { Loading } from "@/components/Loading";
import { APP_DESCRIPTION, APP_NAME, APP_URL, APP_EMOJI } from "@/utils/config";

export async function generateMetadata({
  params,
}: {
  params: { hash: string };
}): Promise<Metadata> {
  return {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${APP_URL}/api/og?hash=${params.hash}`,
        button: {
          title: `Launch ${APP_NAME} ${APP_EMOJI}`,
          action: {
            type: "launch_frame",
            name: APP_NAME,
            url: APP_URL,
            splashImageUrl: `${APP_URL}/splash.png`,
            splashBackgroundColor: "#f0ebff",
          },
        },
      }),
    },
  };
}

export default function Page() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Suspense fallback={<Loading />}>
        <Memory />
      </Suspense>
    </div>
  );
}

"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import Link from "next/link";

export function Memory() {
  const { context } = useMiniKit();
  const [casts, setCasts] = useState<any[]>([]);

  useEffect(() => {
    async function auth() {
      const res = await fetch(`/api/memory?fid=${context?.user?.fid}`);
      const data = await res.json();

      setCasts(data.casts);
    }

    auth();
  }, [context?.user]);

  if (!context?.user || !casts.length) return null;

  return (
    <>
      {casts.map((cast) => (
        <Card key={cast.id} title={cast.year}>
          <p>{cast.cast.text}</p>
          <Link
            href={`https://warpcast.com/${cast.cast.author.username}/${cast.cast.hash}`}
            className="text-sm text-gray-500 mt-4"
          >
            View on Farcaster
          </Link>
        </Card>
      ))}
    </>
  );
}

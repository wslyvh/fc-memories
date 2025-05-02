"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import { MemoryCard } from "./MemoryCard";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

export function Memory() {
  const { context } = useMiniKit();
  const searchParams = useSearchParams();
  const fid = context?.user?.fid ?? searchParams.get("fid") ?? 3;
  const [casts, setCasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCasts() {
      try {
        const res = await fetch(`/api/memory?fid=${fid}`);
        const data = await res.json();

        const casts = data.casts.filter((cast: any) =>
          dayjs(cast.cast.timestamp).isBefore(dayjs().subtract(1, "year")),
        );

        setCasts(casts);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCasts();
  }, [context?.user]);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          width="32"
          height="32"
          className="block"
        >
          <circle
            fill="none"
            stroke="#8660cc"
            strokeOpacity="1"
            strokeWidth="1"
            cx="20"
            cy="20"
            r="0"
          >
            <animate
              attributeName="r"
              calcMode="spline"
              dur="1.2s"
              values="2;16"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              calcMode="spline"
              dur="1.2s"
              values="2;6"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              calcMode="spline"
              dur="1.2s"
              values="1;0"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    );

  if (error) return <div className="text-center">Error loading casts</div>;

  if (casts?.length === 0) return null;

  return (
    <>
      {casts.map((cast) => (
        <MemoryCard key={cast.cast.hash} cast={cast.cast} />
      ))}
    </>
  );
}

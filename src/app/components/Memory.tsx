"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MemoryCard } from "./MemoryCard";
import { Loading } from "./Loading";
import dayjs from "dayjs";

export function Memory() {
  const { context } = useMiniKit();
  const searchParams = useSearchParams();
  const fid = context?.user?.fid ?? searchParams.get("fid");
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
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (fid) {
      fetchCasts();
    }
  }, [fid]);

  if (!fid)
    return (
      <div className="text-center text-gray-500 text-sm">No fid provided</div>
    );

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="text-center text-gray-500 text-sm">
        Error loading casts
      </div>
    );

  if (casts?.length === 0)
    return (
      <div className="text-center text-gray-500 text-sm">
        No casts found on this day in the past year(s).
      </div>
    );

  return (
    <>
      {casts.map((cast) => (
        <MemoryCard key={cast.cast.hash} cast={cast.cast} />
      ))}
    </>
  );
}

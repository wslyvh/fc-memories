"use client";

import { Suspense } from "react";
import { Memory } from "@/components/Memory";
import { Loading } from "@/components/Loading";

export default function Page() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Suspense fallback={<Loading />}>
        <Memory />
      </Suspense>
    </div>
  );
}

"use client";

import { Memory } from "./components/Memory";
import { Loading } from "./components/Loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Suspense fallback={<Loading />}>
        <Memory />
      </Suspense>
    </div>
  );
}

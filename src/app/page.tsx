"use client";

import { Memory } from "./components/Memory";
import { Account } from "./components/Account";
import { OnThisDayHeader } from "./components/OnThisDay";

export default function Page() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Account />

      <OnThisDayHeader />

      <Memory />
    </div>
  );
}

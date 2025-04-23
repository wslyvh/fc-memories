"use client";

import { Memory } from "./components/Memory";
import { Account } from "./components/Account";

export default function Page() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Account />

      <Memory />
    </div>
  );
}

"use client";

import { APP_NAME, APP_DESCRIPTION, APP_EMOJI } from "@/utils/config";
import { Account } from "./components/Account";

export default function Page() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Account />

    </div>
  );
}

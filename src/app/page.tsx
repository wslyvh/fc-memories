"use client";

import { APP_NAME, APP_DESCRIPTION, APP_EMOJI } from "@/utils/config";
import { Card } from "./components/Card";

export default function Page() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title={`${APP_EMOJI} ${APP_NAME}`}>
        <p className="text-[var(--app-foreground-muted)] mb-4">
          {APP_DESCRIPTION}
        </p>
      </Card>
    </div>
  );
}

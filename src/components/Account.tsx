"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { Card } from "./Card";

export function Account() {
  const { context } = useMiniKit();

  if (!context?.user) return null;

  return (
    <Card title={context?.user.displayName}>
      <p className="text-[var(--app-foreground-muted)] mb-4">
        fid: {context?.user.fid}
      </p>

      <pre>{JSON.stringify(context?.user, null, 2)}</pre>
    </Card>
  );
}

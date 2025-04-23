"use client";

import { useAddFrame, useMiniKit } from "@coinbase/onchainkit/minikit";
import { useMemo, useState, useCallback } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { APP_EMOJI, APP_NAME } from "@/utils/config";

export function Header() {
  const { context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);

  const addFrame = useAddFrame();

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <header className="flex justify-between items-center mb-3 h-11">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold">
          {APP_EMOJI} {APP_NAME}
        </span>
      </div>
      <div>{saveFrameButton}</div>
    </header>
  );
}

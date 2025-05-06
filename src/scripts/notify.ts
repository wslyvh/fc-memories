import { getAllUserNotificationDetails } from "@/lib/notification";
import { getPopularCasts } from "@/lib/farcaster";
import { sendFrameNotification } from "@/lib/notification-client";
import "dotenv/config";
import { APP_EMOJI } from "@/utils/config";

async function main() {
  const subscribers = await getAllUserNotificationDetails();
  console.log("Send notifications to", subscribers.length, "subscribers");

  for (const sub of subscribers) {
    const fid = Number(sub.fid);
    if (!fid) continue;

    const casts = await getPopularCasts(fid);
    if (!casts || casts.length === 0) {
      continue;
    }

    if (casts.length === 1) {
      await sendFrameNotification({
        fid,
        title: `You have new memories ${APP_EMOJI}`,
        body: `Look back at your memories from ${casts[0].year}.`,
      });
    }

    if (casts.length > 1) {
      await sendFrameNotification({
        fid,
        title: `You have new memories ${APP_EMOJI}`,
        body: `Look back at your memories from ${casts.length} years.`,
      });
    }
  }
}

main().catch((err) => {
  console.error("Error in daily notification script:", err);
  process.exit(1);
});

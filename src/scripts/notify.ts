import { getAllUserNotificationDetails } from "@/lib/notification";
import { getPopularCasts } from "@/lib/farcaster";
import { sendFrameNotification } from "@/lib/notification-client";
import "dotenv/config";
import { APP_EMOJI } from "@/utils/config";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

async function main() {
  const subscribers = await getAllUserNotificationDetails();
  console.log("Total subscribers:", subscribers.length);

  let notificationsSent = 0;

  for (const sub of subscribers) {
    const fid = Number(sub.fid);
    if (!fid) continue;

    const casts = await getPopularCasts(fid);
    if (!casts || casts.length === 0) {
      continue;
    }

    console.log("Sending notification to", fid);

    if (casts.length === 1) {
      await sendFrameNotification({
        fid,
        title: `You have new memories ${APP_EMOJI}`,
        body: `Look back at your memories from ${casts[0].year}.`,
      });
      notificationsSent++;
    }

    if (casts.length > 1) {
      await sendFrameNotification({
        fid,
        title: `You have new memories ${APP_EMOJI}`,
        body: `Look back at your memories from the past ${casts.length} years.`,
      });
      notificationsSent++;
    }
  }

  // Log the notification count
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const logEntry = `${today}: ${notificationsSent} notifications sent\n`;

  // Ensure logs directory exists
  const logsDir = join(process.cwd(), "logs");
  if (!existsSync(logsDir)) {
    mkdirSync(logsDir, { recursive: true });
  }

  // Append to notifications.txt
  const logFile = join(logsDir, "notifications.txt");
  writeFileSync(logFile, logEntry, { flag: "a" });

  console.log(
    `Notification script completed. Sent ${notificationsSent} notifications.`,
  );
}

main().catch((err) => {
  console.error("Error in daily notification script:", err);
  process.exit(1);
});

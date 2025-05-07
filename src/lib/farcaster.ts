import dayjs from "dayjs";
import "dotenv/config";

export async function getCasts(fid: number) {
  console.log("getCasts", fid);
  if (!process.env.NEYNAR_API_KEY) {
    console.error("NEYNAR_API_KEY is required");
    return [];
  }

  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/cast/search?author_fid=${fid}&q=* after:${dayjs().subtract(1, "d").format("YYYY-MM-DD")} before:${dayjs().format("YYYY-MM-DD")}&limit=20`,
    {
      headers: {
        "x-api-key": process.env.NEYNAR_API_KEY,
      },
    },
  );

  const data = await response.json();
  return data.result.casts;
}

export async function getPopularCasts(fid: number, historical = true) {
  console.log("getPopularCasts", fid);
  if (!process.env.NEYNAR_API_KEY) {
    console.error("NEYNAR_API_KEY is required");
    return [];
  }

  let yearCasts = [];
  const startYear = 2021;
  const currentDate = dayjs(); // dayjs("2025-05-02");
  const currentYear = currentDate.year();
  const currentMonth = currentDate.month() + 1; // months are 0-indexed
  const currentDay = currentDate.date();

  for (let year = startYear; year <= currentYear; year++) {
    const date = dayjs(`${year}-${currentMonth}-${currentDay}`).add(1, "d");
    const response = await fetch(
      `https://api.neynar.com/v2/farcaster/cast/search?author_fid=${fid}&q=* before:${date.format("YYYY-MM-DD")} after:${date.subtract(1, "d").format("YYYY-MM-DD")}&limit=20`,
      {
        headers: {
          "x-api-key": process.env.NEYNAR_API_KEY,
        },
      },
    );

    const data = await response.json();
    if (!data.result?.casts?.length) continue;

    const castsWithScore = data.result.casts.map((cast: any) => ({
      ...cast,
      engagementScore:
        cast.reactions.likes_count * 1 +
        cast.reactions.recasts_count * 2 +
        cast.replies.count * 1.5,
    }));

    const mostPopularCast = castsWithScore.reduce((prev: any, current: any) =>
      current.engagementScore > prev.engagementScore ? current : prev,
    );

    yearCasts.push({
      year,
      cast: mostPopularCast,
    });
  }

  if (historical) {
    yearCasts = yearCasts.filter((cast: any) => cast.year !== currentYear);
  }

  return yearCasts;
}

import { getPopularCasts } from "@/lib/farcaster";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get("fid");
    const casts = await getPopularCasts(Number(fid));

    const secondsUntilMidnight = Math.floor(
      dayjs().utc().endOf("day").add(1, "second").diff(dayjs().utc(), "second"),
    );

    return NextResponse.json(
      { casts },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=" +
            secondsUntilMidnight +
            ", stale-while-revalidate",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}

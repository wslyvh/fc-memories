import { getCast } from "@/lib/farcaster";
import { APP_EMOJI } from "@/utils/config";
import { APP_NAME } from "@/utils/config";
import { ImageResponse } from "next/og";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Cache for 24 hours
export const revalidate = 86400;

function processText(text: string) {
  // Split text into parts based on mentions and links
  const parts = text.split(/(@\w+|https?:\/\/[^\s]+)/g);

  return parts.map((part, index) => {
    if (part.startsWith("@") || part.startsWith("http")) {
      return (
        <span key={index} tw="text-[#8660cc]">
          {part}
        </span>
      );
    }

    return part;
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hash = searchParams.get("hash");

  // If no hash is provided, return the default image
  if (!hash) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/image.png",
        "Cache-Control": `public, max-age=${revalidate}, stale-while-revalidate`,
      },
    });
  }

  try {
    // If no cast is found, return the default image
    console.log("Generating OG image for hash", hash);
    const cast = await getCast(hash);
    if (!cast) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/image.png",
          "Cache-Control": `public, max-age=${revalidate}, stale-while-revalidate`,
        },
      });
    }

    // Generate dynamic image for hash
    return new ImageResponse(
      (
        <div tw="flex flex-col h-full w-full bg-[#f0ebff] p-8 relative">
          {/* Header */}
          <div tw="flex text-4xl font-bold text-[#663399]">
            Farcaster {APP_NAME} {APP_EMOJI}
          </div>

          {/* Farcaster logo */}
          <div
            tw="absolute bg-[#9370db] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 180,
              left: 120,
              width: 45,
              height: 45,
              transform: "rotate(-12deg)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="white" />
              <path d="M4 12L12 16L20 12" stroke="white" strokeWidth="2" />
              <path d="M4 16L12 20L20 16" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          {/* Chat bubble */}
          <div
            tw="absolute bg-[#b794f4] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 250,
              right: 100,
              width: 38,
              height: 38,
              transform: "rotate(15deg)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                fill="white"
              />
            </svg>
          </div>

          {/* Location pin */}
          <div
            tw="absolute bg-[#8660cc] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 650,
              left: 40,
              width: 42,
              height: 42,
              transform: "rotate(8deg)",
            }}
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"
                fill="white"
                stroke="white"
                strokeWidth="2"
              />
              <circle cx="12" cy="10" r="3" fill="#8660cc" />
            </svg>
          </div>

          {/* Picture icon */}
          <div
            tw="absolute bg-[#c4b5fd] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 580,
              right: 80,
              width: 80,
              height: 80,
              transform: "rotate(-5deg)",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="white"
                strokeWidth="2"
                fill="white"
              />
              <circle cx="8.5" cy="8.5" r="1.5" fill="#c4b5fd" />
              <path
                d="M6 15l2-2 3 3m4-4l3 3v2M14.5 11l1.5-1.5 2 2"
                stroke="#c4b5fd"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Person icon */}
          <div
            tw="absolute bg-[#a78bda] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 20,
              left: 1100,
              width: 35,
              height: 35,
              transform: "rotate(22deg)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="white" />
              <path
                d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Settings icon */}
          <div
            tw="absolute bg-[#d8b4fe] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 40,
              left: 1120,
              width: 32,
              height: 32,
              transform: "rotate(-18deg)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Currency icon */}
          <div
            tw="absolute bg-[#7a50c0] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 20,
              left: 880,
              width: 42,
              height: 42,
              transform: "rotate(17deg)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="2"
                fill="white"
              />
              <path
                d="M14.5 9c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9z"
                fill="#7a50c0"
              />
              <path
                d="M9.5 15c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"
                fill="#7a50c0"
              />
              <path
                d="M8 8l8 8"
                stroke="#7a50c0"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Lab test icon */}
          <div
            tw="absolute bg-[#9f7aea] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 400,
              left: 60,
              width: 42,
              height: 42,
              transform: "rotate(-13deg)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 3h6v4l-3 3-3-3V3z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 14h8M8 17h5"
                stroke="#9f7aea"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Bell notification */}
          <div
            tw="absolute bg-[#6a4c93] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 400,
              left: 1100,
              width: 44,
              height: 44,
              transform: "rotate(12deg)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="white"
              />
              <path
                d="M13.73 21a2 2 0 01-3.46 0"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Music note */}
          <div
            tw="absolute bg-[#b794f4] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 650,
              left: 80,
              width: 50,
              height: 50,
              transform: "rotate(-15deg)",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18V5l12-2v13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="6"
                cy="18"
                r="3"
                fill="white"
                stroke="white"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="16"
                r="3"
                fill="white"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Video camera */}
          <div
            tw="absolute bg-[#9f7aea] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 700,
              left: 1050,
              width: 46,
              height: 46,
              transform: "rotate(5deg)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M23 7l-7 5 7 5V7z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="1"
                y="5"
                width="15"
                height="14"
                rx="2"
                ry="2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="white"
              />
            </svg>
          </div>

          {/* Star icon */}
          <div
            tw="absolute bg-[#8660cc] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              bottom: 20,
              left: 180,
              width: 40,
              height: 40,
              transform: "rotate(9deg)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="white"
              />
            </svg>
          </div>

          {/* Heart icon */}
          <div
            tw="absolute bg-[#a78bda] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 500,
              left: 90,
              width: 64,
              height: 64,
              transform: "rotate(-11deg)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                fill="white"
              />
            </svg>
          </div>

          {/* Thumbs up icon */}
          <div
            tw="absolute bg-[#9370db] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 120,
              left: 1100,
              width: 45,
              height: 45,
              transform: "rotate(14deg)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Calendar icon */}
          <div
            tw="absolute bg-[#6a4c93] rounded-lg shadow-lg flex items-center justify-center"
            style={{
              top: 220,
              left: 60,
              width: 48,
              height: 48,
              transform: "rotate(7deg)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" fill="white" />
              <path
                d="M16 2v4M8 2v4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M3 10h18" stroke="white" strokeWidth="2" />
              <path
                d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"
                stroke="#6a4c93"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Background cards */}
          <div
            tw="flex absolute left-56 top-26 h-[640px] w-[780px] bg-[#d9cdf3] rounded-2xl shadow-xl"
            style={{ transform: "rotate(-2deg)" }}
          >
            &nbsp;
          </div>

          <div
            tw="flex absolute left-52 top-27 h-[610px] w-[790px] bg-[#e4dcf9] rounded-2xl shadow-xl"
            style={{ transform: "rotate(-6deg)" }}
          >
            &nbsp;
          </div>

          <div
            tw="flex absolute left-54 top-32 h-[600px] w-[780px] bg-[#c0ace6] rounded-2xl shadow-xl"
            style={{ transform: "rotate(6deg)" }}
          >
            &nbsp;
          </div>

          {/* Card Container */}
          <div tw="flex items-center justify-center mt-10">
            <div tw="flex w-[780px] bg-white rounded-2xl shadow-xl p-8">
              <div tw="flex flex-col w-full">
                {/* Author info */}
                <div tw="flex items-center mb-6">
                  <div tw="flex w-28 h-28 bg-[#f0ebff] flex-shrink-0 border-4 border-[#f0ebff] rounded-full items-center justify-center overflow-hidden">
                    {cast.author?.pfp_url ? (
                      <img
                        src={cast.author.pfp_url}
                        tw="w-full h-full rounded-full"
                        style={{ objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <div tw="w-full h-full bg-gray-200 rounded-full" />
                    )}
                  </div>

                  <div tw="flex flex-col justify-center ml-4">
                    <h3 tw="font-bold text-gray-800 text-2xl leading-tight mb-2">
                      {cast.author?.display_name || "Anon"}
                    </h3>
                    <p tw="text-gray-500 text-xl leading-tight mt-0">
                      {cast.author?.username || ""}
                    </p>
                  </div>

                  <div tw="flex ml-auto items-start">
                    <div tw="w-20 h-20 bg-[#f0ebff] rounded-lg flex items-center justify-center">
                      <span tw="text-[#8660cc] font-bold text-4xl">
                        &apos;
                        {dayjs(cast.timestamp)
                          .format("YYYY")
                          .toString()
                          .slice(-2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cast content */}
                <div tw="flex flex-col bg-white border border-2 border-gray-100 px-4 rounded-xl">
                  <div tw="flex flex-col text-xl text-gray-800 h-[340px] overflow-hidden relative">
                    {cast.text
                      .replace(/\n{2,}/g, "\n")
                      .split("\n")
                      .map((line: string, i: number) => (
                        <p key={i} style={{ whiteSpace: "pre-wrap" }}>
                          {processText(line)}
                        </p>
                      ))}

                    {/* Gradient overlay for fade-out effect */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "32px", // Adjust height for fade length
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  <div tw="flex flex-row justify-between items-center">
                    <div tw="flex items-center text-sm">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                          fill="#8660cc"
                          opacity={0.4}
                        />
                      </svg>
                      <p tw="text-lg text-[#8660cc] ml-2">
                        {cast?.reactions?.likes_count || 0}
                      </p>
                    </div>
                    <p tw="text-lg text-[#8660cc] font-bold">
                      Posted {dayjs(cast.timestamp).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 800,
        headers: {
          "Cache-Control": `public, max-age=${revalidate}, stale-while-revalidate`,
        },
      },
    );
  } catch (error) {
    console.error("Error generating OG image:", error);

    // Fallback to default image on error on production but throw error on dev
    if (process.env.NODE_ENV === "production") {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/image.png",
          "Cache-Control": `public, max-age=0, stale-while-revalidate`,
        },
      });
    } else {
      throw error;
    }
  }
}

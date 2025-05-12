import { getCast } from "@/lib/farcaster";
import { APP_EMOJI } from "@/utils/config";
import { APP_NAME } from "@/utils/config";
import { APP_URL } from "@/utils/config";
import { ImageResponse } from "next/og";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Cache for 24 hours
export const revalidate = 86400;

function getTextSize(text: string) {
  if (text.length > 200) {
    return "text-xl";
  }
  if (text.length > 100) {
    return "text-2xl";
  }

  return "text-3xl";
}

function processText(text: string) {
  // Split text into parts based on mentions and links
  const parts = text.split(/(@[\w.]+|https?:\/\/[^\s]+)/g);

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
        <div
          tw="flex flex-col h-full w-full p-8 relative"
          style={{
            backgroundImage: `url("${APP_URL}/bg.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#f0ebff",
          }}
        >
          {/* Header */}
          <div tw="flex text-4xl font-bold text-[#663399]">
            Farcaster {APP_NAME} {APP_EMOJI}
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
                  <div
                    tw={`flex flex-col  text-gray-800 h-[340px] leading-relaxed overflow-hidden relative ${getTextSize(
                      cast.text,
                    )}`}
                  >
                    {cast.text
                      .replace(/\n{2,}/g, "\n")
                      .split("\n")
                      .map((line: string, i: number) => (
                        <p
                          key={i}
                          tw="flex flex-wrap"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
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

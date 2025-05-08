import { APP_EMOJI, APP_URL } from "@/utils/config";
import sdk from "@farcaster/frame-sdk";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
dayjs.extend(relativeTime);

interface Props {
  cast: any;
}

export function MemoryCard(props: Props) {
  const cast = props.cast;

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden p-4 md:p-8">
        {/* Author info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-[#f0ebff] overflow-hidden flex-shrink-0 border-2 border-[#f0ebff] rounded-full">
            <img
              src={cast.author.pfp_url || "/placeholder.svg"}
              alt={cast.author.username}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">
              {cast.author.display_name}
            </h3>
            <p className="text-gray-500">{cast.author.username}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-12 h-12 bg-[#f0ebff] rounded-lg flex items-center justify-center">
              <span className="text-[#8660cc] font-bold text-xl">
                &apos;
                {dayjs(cast.timestamp).format("YYYY").toString().slice(-2)}
              </span>
            </div>
          </div>
        </div>

        {/* Memory content */}
        <div className="relative mb-8">
          {/* Decorative elements */}
          <div className="absolute -top-2 -left-2 w-10 h-10 bg-[#f0ebff] rounded-lg -z-10"></div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#f0ebff] rounded-lg -z-10"></div>

          {/* Content */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-6 shadow-sm relative z-10">
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">
              {cast.text}
            </p>

            <div className="flex flex-row justify-between items-center gap-2 mt-4 md:mt-8">
              <div className="flex items-center gap-2 text-sm">
                <svg
                  width="16"
                  height="16"
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
                <span className="text-[#8660cc]">
                  {cast.reactions.likes_count}
                </span>
              </div>

              <div className="text-[#8660cc] font-bold">
                Posted {dayjs(cast.timestamp).fromNow()}
              </div>
            </div>
          </div>
        </div>

        {/* Memory metadata */}
        <div className="flex flex-wrap items-center justify-between">
          <Link
            href="#"
            className="text-gray-500 text-sm inline-flex items-center gap-1"
            onClick={async () => {
              await sdk.actions.composeCast({
                text: `Check out this banger from ${dayjs(cast.timestamp).format("YYYY")} ${APP_EMOJI}`,
                embeds: [`${APP_URL}/cast/${cast.hash}`],
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Share
          </Link>
          <Link
            href={`https://warpcast.com/${cast.author.username}/${cast.hash}`}
            className="text-gray-500 text-sm inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            View
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 7L7 17M17 7h-6m6 0v6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

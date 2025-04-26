import dayjs from "dayjs";

export function Header() {
  const today = new Date();

  return (
    <div className="w-full relative">
      {/* Main header background - spans full width */}
      <div className="w-full h-[180px] bg-gradient-to-r from-[#7a50c0] via-[#8660cc] to-[#7a50c0] relative overflow-hidden">
        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Centered container for icons/calendar */}
        <div className="relative mx-auto max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-full overflow-visible">
          {/* Safe zone for calendar - no elements should overlap this area */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] z-10">
            {/* This is an invisible safe zone */}
          </div>

          {/* Floating social elements with larger sizes - using percentage positioning */}
          {/* Farcaster logo */}
          {/* <div className="absolute top-6 left-[6%] w-[45px] h-[45px] bg-[#9370db] rounded-lg shadow-lg transform rotate-[-12deg] flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="white" />
              <path d="M4 12L12 16L20 12" stroke="white" strokeWidth="2" />
              <path d="M4 16L12 20L20 16" stroke="white" strokeWidth="2" />
            </svg>
          </div> */}

          {/* Chat bubble */}
          <div className="absolute top-16 right-[5%] w-[38px] h-[38px] bg-[#b794f4] rounded-lg shadow-lg transform rotate-[15deg] flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                fill="white"
              />
            </svg>
          </div>

          {/* Location pin icon */}
          <div className="absolute top-6 left-[35%] w-[42px] h-[42px] bg-[#8660cc] rounded-lg shadow-lg transform rotate-[8deg] flex items-center justify-center">
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          {/* <div className="absolute top-20 left-[15%] w-[40px] h-[40px] bg-[#c4b5fd] rounded-lg shadow-lg transform rotate-[-5deg] flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          </div> */}

          {/* Person icon */}
          <div className="absolute top-20 left-[10%] w-[35px] h-[35px] bg-[#a78bda] rounded-lg shadow-lg transform rotate-[22deg] flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <div className="absolute top-4 right-[20%] w-[32px] h-[32px] bg-[#d8b4fe] rounded-lg shadow-lg transform rotate-[-18deg] flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <div className="absolute top-10 right-[30%] w-[48px] h-[48px] bg-[#7a50c0] rounded-lg shadow-lg transform rotate-[17deg] flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <div className="absolute top-6 right-[8%] w-[42px] h-[42px] bg-[#9f7aea] rounded-lg shadow-lg transform rotate-[-13deg] flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <div className="absolute top-8 left-[20%] w-[44px] h-[44px] bg-[#6a4c93] rounded-lg shadow-lg transform rotate-[12deg] flex items-center justify-center">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <div className="absolute top-6 left-[4%] w-[50px] h-[50px] bg-[#b794f4] rounded-lg shadow-lg transform rotate-[-15deg] flex items-center justify-center">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <div className="absolute top-16 right-[21%] w-[46px] h-[46px] bg-[#9f7aea] rounded-lg shadow-lg transform rotate-[5deg] flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <div className="absolute bottom-4 left-[18%] w-[40px] h-[40px] bg-[#8660cc] rounded-lg shadow-lg transform rotate-[9deg] flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="white"
              />
            </svg>
          </div>

          {/* Heart icon */}
          <div className="absolute bottom-6 right-[12%] w-[44px] h-[44px] bg-[#a78bda] rounded-lg shadow-lg transform rotate-[-11deg] flex items-center justify-center">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                fill="white"
              />
            </svg>
          </div>

          {/* Thumbs up icon */}
          <div className="absolute bottom-8 left-[30%] w-[38px] h-[38px] bg-[#9370db] rounded-lg shadow-lg transform rotate-[14deg] flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <div className="absolute bottom-5 right-[35%] w-[48px] h-[48px] bg-[#6a4c93] rounded-lg shadow-lg transform rotate-[7deg] flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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

          {/* Calendar in center with thick top border - positioned relative to the viewport width */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
            <div className="w-[100px] h-[100px] bg-white rounded-xl shadow-[0_0_20px_5px_rgba(0,0,0,0.10)] flex flex-col items-center justify-center relative">
              {/* Thick top border for calendar */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-[#ff6188] rounded-t-xl flex items-center justify-center">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-[#8660cc] text-xl font-bold uppercase mt-4">
                {dayjs(today).format("MMM")}
              </div>
              <div className="text-[#8660cc] text-5xl font-bold">
                {dayjs(today).format("DD")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="w-full h-[60px] bg-[#f0ebff] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="text-[#8660cc] font-bold text-xl">
            1 YEAR AGO TODAY
          </div>
        </div>
      </div>
    </div>
  );
}

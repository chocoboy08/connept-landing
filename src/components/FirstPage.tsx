import background from "../assets/background.svg";
import logo from "../assets/logo.svg";
import video from "../assets/video.mp4";

interface FirstPageProps {
  onContactClick: () => void;
}

export function FirstPage({ onContactClick }: FirstPageProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Video + Content */}
      <div className="relative flex-1">
        {/* Background Video */}
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          poster={background}
          preload="auto"
          className="w-full h-screen object-cover"
        />

        {/* Header with gradient background matching video */}
        <div className="absolute top-0 left-0 w-full z-20 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-full"
            style={{
              width: "1280px",
              minWidth: "100vw",
              background: "#ffffff20",
            }}
          />
          <div className="relative flex items-center justify-between p-4">
            {/* Left - Logo */}
            <button className="flex items-center gap-2">
              <img
                src={logo}
                className="w-6 h-6 md:w-10 md:h-10"
                alt="logo"
              />
              <span className="text-sm md:text-[22px] text-white font-semibold">
                CONNEPT
              </span>
            </button>

            {/* Right - Navigation & Button */}
            <div className="flex items-center gap-2 md:gap-8">
              {/* Navigation Links */}
              <div className="flex items-center gap-3 md:gap-8 text-white text-xs md:text-[16px] font-normal">
                <span className="cursor-pointer hover:opacity-80">소개</span>
                <span className="cursor-pointer hover:opacity-80">기술</span>
                <span className="cursor-pointer hover:opacity-80">성과</span>
              </div>

              {/* Contact Button */}
              <button
                onClick={onContactClick}
                className="text-white font-normal hover:opacity-90 transition-opacity"
                style={{
                  width: "clamp(60px,8vw,100px)",
                  height: "clamp(28px,5vw,40px)",
                  fontSize: "clamp(11px,2vw,16px",
                  borderRadius: "30px",
                  background:
                    "linear-gradient(102.55deg, #68a1ff 39.09%, #2563eb 99.39%)",
                  border: "1px solid #DDECFF",
                }}
              >
                도입문의
              </button>
            </div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center text-white">
          <div
            className="flex flex-col items-start"
            style={{
              marginTop: "10%",
              marginLeft: "10%",
              gap: "clamp(50px, 15vw, 180px)",
            }}
          >
            <div className="flex flex-col items-start fade-in-left">
              <p
                className="font-normal"
                style={{
                  fontSize: "clamp(20px, 4vw, 45px)",
                  wordBreak: "keep-all",
                }}
              >
                운영부터 맞춤학습 관리까지
              </p>
              <h1
                className="font-semibold"
                style={{
                  fontSize: "clamp(24px, 5vw, 55px)",
                  marginBottom: "clamp(24px, 3vw, 48px)",
                  wordBreak: "keep-all",
                }}
              >
                학원을 위한 올인원 솔루션
              </h1>
            </div>

            <div
              className="flex gap-[30px] fade-in-left-delay-1"
              style={{ gap: "clamp(15px, 2.5vw, 30px)" }}
            >
              <button
                onClick={onContactClick}
                style={{
                  backgroundColor: "#150C9457",
                  border: "2px solid #DBEAFE",
                  padding: "clamp(8px, 1.2vw, 16px) clamp(16px, 3vw, 32px)",
                  borderRadius: "30px",
                  fontSize: "clamp(12px, 1.5vw, 18px)",
                }}
                className="text-white font-normal hover:opacity-90 transition-opacity"
              >
                도입 문의
              </button>
              <button
                style={{
                  backgroundColor: "#ffffff30",
                  border: "2px solid #9EC3FF",
                  padding: "clamp(8px, 1.2vw, 16px) clamp(16px, 3vw, 32px)",
                  borderRadius: "30px",
                  fontSize: "clamp(12px, 1.5vw, 18px)",
                }}
                className="text-white font-normal hover:opacity-90 transition-opacity"
              >
                서비스 미리보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

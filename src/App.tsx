import { useEffect, useRef, useState } from "react";
import "./App.css";
import attendance from "./assets/attendance.svg";
import contents from "./assets/contents.svg";
import contentsCreate from "./assets/contents_create.svg";
import fileUpload from "./assets/file_upload.svg";
import apply from "./assets/icon_apply.svg";
import logo from "./assets/logo.svg";
import message from "./assets/message.svg";
import notebook from "./assets/notebook_1.svg";
import paymentAlert from "./assets/payment_alert.svg";
import payments from "./assets/payments.svg";
import reviewManagement from "./assets/review_management.svg";
import studyReport from "./assets/study_report.svg";
import video from "./assets/video.mp4";

const TESTIMONIALS = [
  {
    name: "이○○ | 중학생 학부모",
    content:
      "아이가 언제 학원에 도착했는 지 바로 알 수 있고, 결제일마다 아이에게 카드를 들려보내기가 걱정이 되었는데 카카*페이로 결제할 수 있어 편합니다. 그리고 매일 보는 단어 시험이나 주간 테스트 결과도 바로바로 리포트로 받아볼 수 있어 좋았습니다.",
  },
  {
    name: "김○○ | 영어학원 원장",
    content:
      "출결, 결제, 콘텐츠 구매 까지 각각 따로 이용하던 서비스들을 CONNEPT 하나로 통합하면서 운영 시간과 고정 비용이 확 줄었습니다. 특히 직접 타이핑하던 학습리포트가 자동으로 생성되는 점이 학부모 상담에 유용했습니다.",
  },
  {
    name: "정○○ | 명지고 2학년",
    content:
      "틀린 문제랑 헷갈리는 단어만 다시 정리할 수 있고 필요할 때 바로 복습할 수 있어서 공부 효율이 높아졌어요. 예전에는 뭐부터 해야 할지 막막했는데, 지금은 해야 할 게 딱 정리돼서 시험 대비할 때 특히 편했어요.",
  },
  {
    name: "김○○ | 서대문구 소재 학원 영어 강사",
    content:
      "수업 자료를 기반으로 이해를 확인할 수 있는 테스트 문제지가 빠르게 생성되고 학생마다 틀린 문제가 달라도 개별 복습 자료가 만들어져서 학습을 관리하기가 편리했고 실제로 반 전체의 성적이 전반적으로 향상 되었습니다.",
  },
];

function App() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeTab, setActiveTab] = useState<"learning" | "operation">(
    "learning"
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const apply = () => setIsMobile(mq.matches);
    apply();

    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  // Reset carousel position when switching between mobile/desktop
  useEffect(() => {
    const totalOriginals = TESTIMONIALS.length;

    if (isMobile) {
      setCurrentIndex(totalOriginals); // Start at second set for infinite loop
    } else {
      setCurrentIndex(0);
      setIsTransitioning(false);
    }
  }, [isMobile]);

  useEffect(() => {
    // Disconnect previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Wait for DOM to update after tab change
    setTimeout(() => {
      const elements = document.querySelectorAll(
        ".fade-in-up, .fade-in-up-delay-1, .fade-in-up-delay-2, .fade-in-left, .fade-in-left-delay-1, .slide-in-left, .slide-in-right"
      );
      elements.forEach((el) => {
        el.classList.remove("animate");
        observerRef.current?.observe(el);
      });
    }, 0);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [activeTab]);

  // Calculate slide width on mount and resize (mobile only)
  useEffect(() => {
    if (!isMobile) return;

    const calculateWidth = () => {
      if (scrollContainerRef.current) {
        const firstChild = scrollContainerRef.current
          .firstElementChild as HTMLElement;
        if (firstChild) {
          const gap =
            parseFloat(getComputedStyle(scrollContainerRef.current).gap) || 0;
          setSlideWidth(firstChild.offsetWidth + gap);
        }
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [isMobile]);

  // Auto-scroll for testimonials (mobile only) - Infinite carousel
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsTransitioning(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Handle transition end for infinite loop (mobile only)
  useEffect(() => {
    if (!isMobile) return;
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      const totalOriginals = TESTIMONIALS.length;

      if (currentIndex >= totalOriginals * 2) {
        setIsTransitioning(false);
        setCurrentIndex(totalOriginals);
      } else {
        setIsTransitioning(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, isMobile]);

  return (
    <div className="h-screen overflow-y-scroll overflow-x-hidden">
      {/* First Page - Hero Section */}
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

      {/* Second Page - Feature Section */}
      <div className="h-screen flex items-center justify-center bg-white px-6">
        <h2
          className="text-center font-semibold whitespace-pre-line fade-in-up"
          style={{
            color: "#4F46E5",
            fontSize: "clamp(36px, 8vw, 90px)",
            lineHeight: "1.2",
            wordBreak: "keep-all",
          }}
        >
          {`운영은 더 쉽게\n관리는 더 체계적으로`}
        </h2>
      </div>

      {/* Third Page - Features Grid Section */}
      <div
        className="h-screen flex flex-col items-center justify-start px-8"
        style={{
          background:
            "linear-gradient(to bottom, #fff 0%, #d1d4ff 63.46%, #eaebff 100%)",
          gap: "clamp(20px, 5vw, 80px)",
        }}
      >
        {/* Feature Boxes Grid */}
        <div
          className="flex flex-col fade-in-up"
          style={{
            gap: "clamp(12px, 1.5vw, 24px)",
            marginBottom: "clamp(16px, 2vw, 32px)",
            marginTop: "clamp(16px, 2vw, 32px)",
          }}
        >
          {/* Row 1 - 2 items */}
          <div
            className="flex justify-center"
            style={{ gap: "clamp(12px, 1.5vw, 24px)" }}
          >
            {["출결 체크", "결제 관리"].map((text) => (
              <div
                key={text}
                className="flex items-center justify-center bg-white"
                style={{
                  width: "clamp(120px, 30vw, 430px)",
                  height: "clamp(34px, 5.5vw, 74px)",
                  borderRadius: "30px",
                  border: "2px solid #584FF2",
                }}
              >
                <span
                  className="font-medium"
                  style={{
                    fontSize: "clamp(14px, 3vw, 40px)",
                    color: "#584FF2",
                    wordBreak: "keep-all",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2 - 3 items */}
          <div
            className="flex justify-center"
            style={{ gap: "clamp(12px, 1.5vw, 24px)" }}
          >
            {["클리닉 자료 제작", "주 · 월간 복습테스트", "수행평가관리"].map(
              (text) => (
                <div
                  key={text}
                  className="flex items-center justify-center text-white"
                  style={{
                    width: "clamp(120px, 30vw, 430px)",
                    height: "clamp(34px, 5.5vw, 74px)",
                    borderRadius: "30px",
                    border: "2px solid #584FF2",
                    backgroundColor: "#584FF2",
                  }}
                >
                  <span
                    className="font-medium"
                    style={{
                      fontSize: "clamp(14px, 3vw, 40px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    {text}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Row 3 - 2 items */}
          <div
            className="flex justify-center"
            style={{ gap: "clamp(12px, 1.5vw, 24px)" }}
          >
            {["시험대비", "모의고사준비"].map((text) => (
              <div
                key={text}
                className="flex items-center justify-center text-white"
                style={{
                  width: "clamp(120px, 30vw, 430px)",
                  height: "clamp(34px, 5.5vw, 74px)",
                  borderRadius: "30px",
                  border: "2px solid #584FF2",
                  backgroundColor: "#584FF2",
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    fontSize: "clamp(14px, 3vw, 40px)",
                    wordBreak: "keep-all",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div
          className="flex flex-col fade-in-up-delay-1"
          style={{ gap: "15px", marginBottom: "clamp(16px, 2vw, 32px)" }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#4F46E5",
              }}
            />
          ))}
        </div>

        {/* Title Text */}
        <div className="fade-in-up-delay-2">
          <h2
            className="text-[#584FF2] text-center font-medium whitespace-pre-line"
            style={{
              fontSize: "clamp(22px, 4vw, 45px)",
              lineHeight: "1.4",
              marginBottom: "clamp(32px, 3vw, 48px)",
              wordBreak: "keep-all",
            }}
          >
            {`학원 운영에 필요한 모든 기능\n이제 하나의 시스템으로 관리하세요.`}
          </h2>
          <img src={notebook} alt="notebook" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Fourth Page */}
      <div
        className="min-h-screen flex flex-col items-center justify-start px-8"
        style={{
          background:
            "linear-gradient(to bottom, #eaebff 0%, #eaebff 62.02%, #dfe0fd 100%)",
          gap: "clamp(32px, 8vw, 220px)",
          paddingBottom: "clamp(32px, 6vw, 100px)",
        }}
      >
        {/* Tab Container */}
        <div
          className="relative bg-white"
          style={{
            width: "clamp(280px, 26vw, 370px)",
            height: "clamp(50px, 4.5vw, 64px)",
            borderRadius: "30px",
            border: "2px solid #4F46E540",
            padding: "0px",
          }}
        >
          {/* Animated Background Slider */}
          <div
            className="absolute top-0 transition-all duration-300 ease-in-out"
            style={{
              width: "50%",
              height: "100%",
              borderRadius: "30px",
              background:
                "linear-gradient(131.6deg, #a8a3ef 2.63%, #6961e8 44.53%, #4f46e5 97.37%)",
              left: activeTab === "learning" ? "0px" : "50%",
            }}
          />

          {/* Tab Buttons */}
          <div className="relative flex h-full">
            <button
              onClick={() => setActiveTab("learning")}
              className="flex-1 font-medium transition-colors duration-300"
              style={{
                color: activeTab === "learning" ? "#ffffff" : "#26262a40",
                fontSize: "clamp(16px, 1.7vw, 24px)",
              }}
            >
              학습 관리
            </button>
            <button
              onClick={() => setActiveTab("operation")}
              className="flex-1 font-medium transition-colors duration-300"
              style={{
                color: activeTab === "operation" ? "#ffffff" : "#4F46E540",
                fontSize: "clamp(16px, 1.7vw, 24px)",
              }}
            >
              운영 관리
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "learning" && (
          <div
            className="flex flex-col items-center w-full fade-in-up"
            style={{ gap: "clamp(32px, 8vw, 220px)" }}
          >
            {/* Subtitle Badge */}
            <div
              className="flex flex-col items-center"
              style={{ gap: "clamp(32px, 14vw, 220px)" }}
            >
              <div
                className="flex flex-col items-center"
                style={{
                  marginTop: "clamp(16px, 7.5vw, 120px)",
                  gap: "clamp(24px, 7.5vw, 120px)",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "clamp(180px, 17vw, 240px)",
                    height: "clamp(48px, 4.5vw, 64px)",
                    borderRadius: "30px",
                    border: "2px solid transparent",
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(0deg, #958EFF 0%, #463ED2 100%)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  <span
                    className="font-medium text-[#4F46E5]"
                    style={{
                      fontSize: "clamp(16px, 1.7vw, 24px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    학습 자료 제작
                  </span>
                </div>

                {/* Main Content */}
                <div className="flex flex-col items-center">
                  {/* First Text */}
                  <p
                    className="font-semibold text-[#4F46E5]"
                    style={{
                      fontSize: "clamp(20px, 3.5vw, 48px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    원하는 파일만 업로드하면
                  </p>
                  {/* File Upload Image */}
                  <img
                    src={fileUpload}
                    alt="file upload"
                    className="max-w-full h-auto"
                  />
                  {/* Second Text */}

                  <div
                    style={{
                      marginTop: "clamp(24px, 4.5vw, 72px)",
                      marginBottom: "clamp(24px, 2.5vw, 40px)",
                    }}
                  >
                    <div
                      className="flex justify-center items-center rounded-[48px] bg-white/40 border border-[#958ff5]"
                      style={{
                        width: "clamp(100px, 8.5vw, 119px)",
                        height: "clamp(28px, 2.3vw, 32px)",
                        marginBottom: "clamp(8px, 0.6vw, 8px)",
                      }}
                    >
                      <p
                        className="font-medium text-left text-[#958ff5]"
                        style={{
                          fontSize: "clamp(11px, 1vw, 12px)",
                          wordBreak: "keep-all",
                        }}
                      >
                        어휘 · 문법 · 지문
                      </p>
                    </div>

                    <p
                      className="font-bold text-[#4F46E5]"
                      style={{
                        fontSize: "clamp(20px, 3.5vw, 48px)",
                        lineHeight: "1.3",
                        wordBreak: "keep-all",
                        textAlign: "center",
                      }}
                    >
                      전 영역 학습자료와 테스트지를 원클릭으로 생성
                    </p>
                  </div>
                  {/* Contents Create Image */}
                  <img
                    src={contentsCreate}
                    alt="contents create"
                    className="max-w-full h-auto"
                    style={{ marginBottom: "clamp(24px, 7.5vw, 120px)" }}
                  />
                  {/* Contents Image */}
                  <img
                    src={contents}
                    alt="contents"
                    className="max-w-full h-auto"
                  />
                </div>
              </div>

              {/* Review Management Section */}
              <div
                className="flex flex-col items-center"
                style={{
                  gap: "clamp(24px, 7.5vw, 120px)",
                  marginTop: "clamp(32px, 4vw, 64px)",
                }}
              >
                {/* Subtitle Badge */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "clamp(180px, 17vw, 240px)",
                    height: "clamp(48px, 4.5vw, 64px)",
                    borderRadius: "30px",
                    border: "2px solid transparent",
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(0deg, #958EFF 0%, #463ED2 100%)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  <span
                    className="font-medium text-[#4F46E5]"
                    style={{
                      fontSize: "clamp(16px, 1.7vw, 24px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    복습 관리
                  </span>
                </div>

                {/* Review Management Content - Left Image, Right Text */}
                <div
                  className="flex items-center max-w-7xl"
                  style={{ gap: "clamp(24px, 3vw, 48px)" }}
                >
                  {/* Left - Image */}
                  <img
                    src={reviewManagement}
                    alt="review management"
                    className="flex-shrink-0 slide-in-left"
                    style={{ maxWidth: "50%" }}
                  />

                  {/* Right - Text Content */}
                  <div
                    className="flex flex-col"
                    style={{ gap: "clamp(16px, 1.5vw, 24px)" }}
                  >
                    {/* Title */}
                    <h3
                      className="font-semibold text-[#4F46E5]"
                      style={{
                        fontSize: "clamp(20px, 3.5vw, 48px)",
                        wordBreak: "keep-all",
                      }}
                    >
                      개별 맞춤 복습 콘텐츠 자동 생성
                    </h3>

                    {/* Description */}
                    <p
                      className="font-medium text-[#000]"
                      style={{
                        fontSize: "clamp(12px, 1.5vw, 20px)",
                        wordBreak: "keep-all",
                      }}
                    >
                      개인 별 학습 기록을 기반으로 복습 컨텐츠를 자동으로
                      추천합니다.
                      <br />
                      주간/ 월간 테스트 · 클리닉 · 시험대비까지
                      <br />
                      체계적인 맞춤 학습으로 학원 경쟁력을 높이세요.
                    </p>
                  </div>
                </div>
              </div>

              {/* Study Report Section */}
              <div
                className="flex flex-col items-center"
                style={{
                  gap: "clamp(24px, 7.5vw, 120px)",
                  marginTop: "clamp(32px, 4vw, 64px)",
                }}
              >
                {/* Subtitle Badge */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "clamp(180px, 17vw, 240px)",
                    height: "clamp(48px, 4.5vw, 64px)",
                    borderRadius: "30px",
                    border: "2px solid transparent",
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(0deg, #958EFF 0%, #463ED2 100%)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  <span
                    className="font-medium text-[#4F46E5]"
                    style={{
                      fontSize: "clamp(16px, 1.7vw, 24px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    학습 리포트 생성
                  </span>
                </div>

                {/* Study Report Content - Left Text, Right Image */}
                <div
                  className="flex items-center max-w-7xl"
                  style={{ gap: "clamp(24px, 3vw, 48px)" }}
                >
                  {/* Left - Text Content */}
                  <div
                    className="flex flex-col"
                    style={{ gap: "clamp(16px, 1.5vw, 24px)" }}
                  >
                    {/* Title */}
                    <h3
                      className="font-semibold text-[#4F46E5] text-right"
                      style={{
                        fontSize: "clamp(20px, 3.5vw, 48px)",
                        wordBreak: "keep-all",
                      }}
                    >
                      학생 개별 리포트를 통한
                      <br />
                      지속적인 학업성취도 관리
                    </h3>

                    {/* Description */}
                    <p
                      className="font-medium text-[#000] text-right"
                      style={{
                        fontSize: "clamp(12px, 1.5vw, 20px)",
                        wordBreak: "keep-all",
                      }}
                    >
                      개인별 학습 기록과 평가 결과를 바탕으로
                      <br />
                      성적 변화와 학습 흐름을 한눈에 확인하고 관리합니다.
                      <br />
                      학부모와 신뢰할 수 있는 학습 성과를 공유하세요.
                    </p>
                  </div>

                  {/* Right - Image */}
                  <img
                    src={studyReport}
                    alt="study report"
                    className="flex-shrink-0 slide-in-right"
                    style={{ maxWidth: "50%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Operation Tab Content */}
        {activeTab === "operation" && (
          <div
            className="flex flex-col items-center w-full fade-in-up"
            style={{ gap: "clamp(32px, 8vw, 220px)" }}
          >
            {/* Attendance Management Section */}
            <div
              className="flex flex-col items-center"
              style={{ gap: "clamp(32px, 2vw, 32px)" }}
            >
              {/* Subtitle Badge */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: "clamp(180px, 17vw, 240px)",
                  height: "clamp(48px, 4.5vw, 64px)",
                  borderRadius: "30px",
                  border: "2px solid transparent",
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(0deg, #958EFF 0%, #463ED2 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <span
                  className="font-semibold text-[#4F46E5]"
                  style={{
                    fontSize: "clamp(16px, 1.7vw, 24px)",
                    wordBreak: "keep-all",
                  }}
                >
                  출결 관리 서비스
                </span>
              </div>

              {/* Attendance Content - Left Image, Right Text */}
              <div
                className="flex items-center max-w-7xl"
                style={{
                  gap: "clamp(24px, 3vw, 48px)",
                  marginBottom: "clamp(32px, 4vw, 64px)",
                }}
              >
                {/* Left - Image */}
                <img
                  src={attendance}
                  alt="attendance"
                  className="flex-shrink-0 slide-in-left"
                  style={{ maxWidth: "50%" }}
                />

                {/* Right - Text Content */}
                <div
                  className="flex flex-col"
                  style={{ gap: "clamp(16px, 1.5vw, 24px)" }}
                >
                  {/* Title */}
                  <h3
                    className="font-bold text-[#4F46E5]"
                    style={{
                      fontSize: "clamp(20px, 3.5vw, 48px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    한눈에 보는 학생 출결 현황
                  </h3>

                  {/* Description */}
                  <p
                    className="font-medium text-black"
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 20px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    학생 별 · 날짜 별 출결 현황을 한 눈에 확인하고 관리하세요.
                  </p>
                </div>
              </div>

              {/* Message Content - Left Text, Right Image */}
              <div
                className="flex items-center max-w-7xl"
                style={{ gap: "clamp(24px, 3vw, 48px)" }}
              >
                {/* Left - Text Content */}
                <div
                  className="flex flex-col"
                  style={{ gap: "clamp(16px, 1.5vw, 24px)" }}
                >
                  {/* Title */}
                  <h3
                    className="font-bold text-[#4F46E5]"
                    style={{
                      fontSize: "clamp(20px, 3.5vw, 48px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    실시간 등·하원 알림 문자
                  </h3>

                  {/* Description */}
                  <p
                    className="font-medium text-black"
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 20px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    학생 등 · 하원 시 학부모 연락처로 실시간 알림을 전송합니다.
                  </p>
                </div>

                {/* Right - Image */}
                <img
                  src={message}
                  alt="message"
                  className="flex-shrink-0 slide-in-right"
                  style={{ maxWidth: "50%" }}
                />
              </div>
            </div>

            {/* Payment Management Section */}
            <div
              className="flex flex-col items-center"
              style={{
                gap: "clamp(32px, 2vw, 32px)",
                marginTop: "clamp(32px, 4vw, 64px)",
              }}
            >
              {/* Subtitle Badge */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: "clamp(180px, 17vw, 240px)",
                  height: "clamp(48px, 4.5vw, 64px)",
                  borderRadius: "30px",
                  border: "2px solid transparent",
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(0deg, #958EFF 0%, #463ED2 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <span
                  className="font-semibold text-[#4F46E5]"
                  style={{
                    fontSize: "clamp(16px, 1.7vw, 24px)",
                    wordBreak: "keep-all",
                  }}
                >
                  결제 관리 서비스
                </span>
              </div>

              {/* Payments Content - Left Image, Right Text */}
              <div
                className="flex items-center max-w-7xl"
                style={{
                  gap: "clamp(24px, 5.5vw, 88px)",
                  marginBottom: "clamp(32px, 4vw, 64px)",
                }}
              >
                {/* Left - Image */}
                <img
                  src={payments}
                  alt="payments"
                  className="flex-shrink-0 slide-in-left"
                  style={{ maxWidth: "50%" }}
                />

                {/* Right - Text Content */}
                <div
                  className="flex flex-col"
                  style={{ gap: "clamp(16px, 1.5vw, 24px)" }}
                >
                  {/* Title */}
                  <h3
                    className="font-bold text-[#4F46E5]"
                    style={{
                      fontSize: "clamp(20px, 3.5vw, 48px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    비대면으로 교육비 간편결제
                  </h3>

                  {/* Description */}
                  <p
                    className="font-medium text-black"
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 20px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    학원방문 없이도 OK! 문자로 교육비 결제를 간편하게
                    받아보세요.
                    <br />
                    모든 페이와 카드 앱 결제를 지원합니다.
                  </p>
                </div>
              </div>

              {/* Payment Alert Content - Left Text, Right Image */}
              <div
                className="flex items-center max-w-7xl"
                style={{ gap: "clamp(24px, 4vw, 64px)" }}
              >
                {/* Left - Text Content */}
                <div
                  className="flex flex-col items-end"
                  style={{ gap: "clamp(16px, 1.5vw, 24px)" }}
                >
                  {/* Title */}
                  <h3
                    className="font-bold text-[#4F46E5] text-right"
                    style={{
                      fontSize: "clamp(20px, 3.5vw, 48px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    결제일에 맞춰 발송되는 결제 알림
                  </h3>

                  {/* Description */}
                  <p
                    className="font-medium text-black text-right"
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 20px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    결제일 당일, 3일 전, 일주일 전 언제든 원하는 날짜에
                    <br />
                    결제 알림 문자와 교육비 내역을 간편하게 전송하세요.
                  </p>
                </div>

                {/* Right - Image with Circle Background */}
                <div
                  className="relative flex-shrink-0 slide-in-right"
                  style={{ maxWidth: "50%" }}
                >
                  {/* Partial Circle Background */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden"
                    style={{
                      width: "clamp(500px, 66vw, 947px)",
                      height: "clamp(90px, 12vw, 172px)",
                    }}
                  >
                    <div
                      style={{
                        width: "clamp(500px, 66vw, 947px)",
                        height: "clamp(500px, 66vw, 947px)",
                        borderRadius: "50%",
                        border: "clamp(4px, 0.6vw, 8px) solid #725AF5",
                        position: "absolute",
                        top: "0",
                        left: "0",
                      }}
                    />
                  </div>
                  {/* Phone Image */}
                  <img
                    src={paymentAlert}
                    alt="payment alert"
                    className="relative z-10 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fifth Page - Testimonials & Free Trial */}
      <div
        className="flex flex-col items-center justify-start bg-linear-to-b from-[#dfe0fd] to-indigo-600"
        style={{ paddingBottom: "clamp(48px, 14vw, 220px)" }}
      >
        {/* Title Badge */}
        <div
          className="flex items-center justify-center"
          style={{
            width: "clamp(320px, 45vw, 640px)",
            height: "clamp(50px, 4.5vw, 64px)",
            borderRadius: "30px",
            border: "2px solid #4F46E5",
            backgroundColor: "#ffffff40",
            padding: "clamp(8px, 1vw, 16px)",
            marginBottom: "clamp(32px, 4vw, 64px)",
          }}
        >
          <span
            className="font-medium text-[#4F46E5] text-center"
            style={{
              fontSize: "clamp(16px, 2.2vw, 30px)",
              wordBreak: "keep-all",
            }}
          >
            후기로 검증된 체계적인 운영 시스템
          </span>
        </div>

        {/* Testimonials Carousel Container */}
        <div
          className={`w-full max-w-7xl ${
            isMobile ? "overflow-hidden" : "overflow-visible"
          } px-[25%] md:px-0`}
          style={{
            marginBottom: "clamp(48px, 9vw, 140px)",
          }}
        >
          <div
            ref={scrollContainerRef}
            className={`flex ${isMobile ? "" : "justify-center"}`}
            style={{
              gap: "clamp(16px, 2.5vw, 40px)",
              transform: isMobile
                ? `translateX(-${currentIndex * slideWidth}px)`
                : "none",
              transition:
                isMobile && isTransitioning
                  ? "transform 0.5s ease-in-out"
                  : "none",
            }}
          >
            {(isMobile
              ? [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]
              : TESTIMONIALS
            ).map((testimonial, index) => (
              <div
                key={index}
                className="bg-white flex flex-col shrink-0"
                style={{
                  width: "clamp(200px, 21vw, 300px)",
                  minHeight: "clamp(180px, 16vw, 225px)",
                  borderRadius: "20px",
                  boxShadow: "0px 10px 10px 0 rgba(0,0,0,0.25)",
                  padding: "clamp(16px, 1.7vw, 24px)",
                }}
              >
                <p
                  className="font-medium mb-3"
                  style={{
                    fontSize: "clamp(13px, 1.2vw, 16px)",
                    wordBreak: "keep-all",
                  }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="font-normal leading-relaxed"
                  style={{
                    fontSize: "clamp(12px, 1.1vw, 15px)",
                    wordBreak: "keep-all",
                  }}
                >
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Free Trial Section */}
        <div
          className="flex flex-col items-center text-white w-full max-w-7xl px-4"
          style={{ gap: "clamp(16px, 1.5vw, 24px)" }}
        >
          <h2
            className="font-semibold text-center"
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              wordBreak: "keep-all",
            }}
          >
            1주 무료체험 신청
          </h2>
          <p
            className="font-normal text-center"
            style={{
              fontSize: "clamp(12px, 1.5vw, 20px)",
              marginBottom: "clamp(8px, 1vw, 16px)",
              wordBreak: "keep-all",
            }}
          >
            지금 무료체험 신청하고 체계적인 올인원 학원관리 서비스를 한 주 간
            이용해보세요.
          </p>

          {/* Form */}
          <div
            className="flex w-full justify-between"
            style={{
              backgroundColor: "#ffffff20",
              borderRadius: "20px",
              padding: "clamp(20px, 2.4vw, 32px)",
              gap: "clamp(16px, 1.7vw, 24px)",
            }}
          >
            {/* Left Column - Inputs */}
            <div
              className="flex flex-col flex-1"
              style={{ gap: "clamp(12px, 1.2vw, 16px)" }}
            >
              <div className="flex flex-col">
                <label
                  className="font-medium mb-2"
                  style={{
                    fontSize: "clamp(12px, 1vw, 16px)",
                    wordBreak: "keep-all",
                  }}
                >
                  학원명 또는 성함
                </label>
                <input
                  type="text"
                  placeholder="학원명 또는 성함을 입력해 주세요"
                  className="rounded-lg text-black bg-white w-full"
                  style={{
                    padding: "clamp(8px, 0.9vw, 12px) clamp(12px, 1.2vw, 16px)",
                    fontSize: "clamp(12px, 1vw, 16px)",
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="font-medium mb-2"
                  style={{
                    fontSize: "clamp(12px, 1vw, 16px)",
                    wordBreak: "keep-all",
                  }}
                >
                  연락처
                </label>
                <input
                  type="tel"
                  placeholder="연락처를 입력해 주세요"
                  className="rounded-lg text-black bg-white w-full"
                  style={{
                    padding: "clamp(8px, 0.9vw, 12px) clamp(12px, 1.2vw, 16px)",
                    fontSize: "clamp(12px, 1vw, 16px)",
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="font-medium mb-2"
                  style={{
                    fontSize: "clamp(12px, 1vw, 16px)",
                    wordBreak: "keep-all",
                  }}
                >
                  이메일
                </label>
                <input
                  type="email"
                  placeholder="이메일을 입력해 주세요"
                  className="rounded-lg text-black bg-white w-full"
                  style={{
                    padding: "clamp(8px, 0.9vw, 12px) clamp(12px, 1.2vw, 16px)",
                    fontSize: "clamp(12px, 1vw, 16px)",
                  }}
                />
              </div>
            </div>

            {/* Right Column - Textarea & Button */}
            <div
              className="flex flex-col flex-1"
              style={{ gap: "clamp(16px, 2vw, 28px)" }}
            >
              <div className="flex flex-col flex-1">
                <label
                  className="font-medium mb-2"
                  style={{
                    fontSize: "clamp(12px, 1vw, 16px)",
                    wordBreak: "keep-all",
                  }}
                >
                  문의사항
                </label>
                <textarea
                  placeholder="문의사항을 입력해 주세요"
                  className="rounded-lg text-black bg-white resize-none w-full flex-1"
                  style={{
                    padding: "clamp(8px, 0.9vw, 12px) clamp(12px, 1.2vw, 16px)",
                    fontSize: "clamp(12px, 1vw, 16px)",
                    minHeight: "clamp(100px, 9vw, 120px)",
                  }}
                />
              </div>
              <button
                className="flex font-semibold rounded-lg bg-white text-[#3B82F6] gap-2 justify-center items-center"
                style={{
                  padding: "clamp(8px, 0.9vw, 12px)",
                  fontSize: "clamp(12px, 1.3vw, 18px)",
                  height: "clamp(40px, 3.5vw, 48px)",
                  wordBreak: "keep-all",
                }}
              >
                <img
                  src={apply}
                  alt="apply"
                  style={{
                    width: "clamp(16px, 1.5vw, 20px)",
                    height: "clamp(16px, 1.5vw, 20px)",
                  }}
                />
                신청하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

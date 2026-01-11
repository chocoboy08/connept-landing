import { useEffect, useRef } from "react";
import attendance from "../assets/attendance.svg";
import contents from "../assets/contents.svg";
import contentsCreate from "../assets/contents_create.svg";
import fileUpload from "../assets/file_upload.svg";
import message from "../assets/message.svg";
import paymentAlert from "../assets/payment_alert.svg";
import payments from "../assets/payments.svg";
import reviewManagement from "../assets/review_management.svg";
import studyReport from "../assets/study_report.svg";

interface FourthPageProps {
  showOperationManagement: boolean;
}

export function FourthPage({ showOperationManagement }: FourthPageProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

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

    // Wait for DOM to update
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
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-8"
      style={{
        background:
          "linear-gradient(to bottom, #eaebff 0%, #eaebff 62.02%, #dfe0fd 100%)",
        gap: "clamp(32px, 8vw, 220px)",
        paddingBottom: "clamp(32px, 6vw, 100px)",
      }}
    >
      {/* Learning Management Section */}
      {
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
                className="relative mb-40"
                style={{ width: "clamp(280px,25vw,360px)" }}
              >
                <div
                  className="absolute left-0 z-10 flex justify-center items-center rounded-[30px]"
                  style={{
                    background:
                      "linear-gradient(131.6deg, #a8a3ef 2.63%, #6961e8 44.53%, #4f46e5 97.37%)",
                    width: "clamp(160px,14vw,200px)",
                    height: "clamp(48px,4.5vw,64px)",
                  }}
                >
                  <p
                    className="font-semibold text-center text-white"
                    style={{ fontSize: "clamp(16px, 1.7vw, 24px)" }}
                  >
                    학습 관리
                  </p>
                </div>
                <div
                  className="absolute left-40 flex justify-center items-center rounded-[30px] bg-white/40 border-2 border-indigo-600/40"
                  style={{
                    width: "clamp(160px,14vw,200px)",
                    height: "clamp(48px,4.5vw,64px)",
                    left: "clamp(120px,12vw,160px)",
                  }}
                >
                  <p
                    className="font-semibold text-center text-indigo-600/40"
                    style={{ fontSize: "clamp(16px, 1.7vw, 24px)" }}
                  >
                    운영 관리
                  </p>
                </div>
              </div>
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
                <div
                  className="flex-shrink-0 slide-in-right"
                  style={{ maxWidth: "50%" }}
                >
                  <img
                    src={studyReport}
                    alt="study report"
                    className="block w-full h-auto"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      {/* Operation Management Section - Only show if showOperationManagement is true */}
      {showOperationManagement && (
        <div
          className="flex flex-col items-center w-full fade-in-up"
          style={{ gap: "clamp(32px, 8vw, 220px)" }}
        >
          {/* Attendance Management Section */}
          <div
            className="flex flex-col items-center"
            style={{ gap: "clamp(32px, 2vw, 32px)" }}
          >
            <div
              className="relative mb-50 mt-15"
              style={{ width: "clamp(280px,25vw,360px)" }}
            >
              <div
                className="absolute left-0  flex justify-center items-center rounded-[30px] bg-white/40 border-2 border-indigo-600/40"
                style={{
                  width: "clamp(160px,14vw,200px)",
                  height: "clamp(48px,4.5vw,64px)",
                }}
              >
                <p
                  className="text-2xl font-semibold text-center text-indigo-600/40"
                  style={{ fontSize: "clamp(16px, 1.7vw, 24px)" }}
                >
                  학습 관리
                </p>
              </div>
              <div
                className="absolute left-40 z-10 flex justify-center items-center rounded-[30px] "
                style={{
                  background:
                    "linear-gradient(131.6deg, #a8a3ef 2.63%, #6961e8 44.53%, #4f46e5 97.37%)",
                  width: "clamp(160px,14vw,200px)",
                  height: "clamp(48px,4.5vw,64px)",
                  left: "clamp(120px,12vw,160px)",
                }}
              >
                <p
                  className="text-2xl font-semibold text-center text-white"
                  style={{ fontSize: "clamp(16px, 1.7vw, 24px)" }}
                >
                  운영 관리
                </p>
              </div>
            </div>
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
              style={{ gap: "clamp(24px, 8vw, 120px)" }}
            >
              {/* Left - Text Content */}
              <div
                className="flex flex-col items-end"
                style={{ gap: "clamp(16px, 1.5vw, 24px)" }}
              >
                {/* Title */}

                <div
                  className="flex justify-center items-center rounded-[48px] bg-white/40 border border-[#958ff5] self-start"
                  style={{
                    width: "clamp(100px, 8.5vw, 119px)",
                    height: "clamp(28px, 2.3vw, 32px)",
                    marginBottom: "clamp(8px, 0.6vw, 8px)",
                  }}
                >
                  <p
                    className="font-medium text-left text-[#958ff5]"
                    style={{
                      fontSize: "clamp(12px, 1.5vw, 16px)",
                      wordBreak: "keep-all",
                    }}
                  >
                    학부모 안심
                  </p>
                </div>
                <h3
                  className="font-bold text-[#4F46E5] text-right"
                  style={{
                    fontSize: "clamp(20px, 3.5vw, 48px)",
                    wordBreak: "keep-all",
                  }}
                >
                  실시간 등·하원 알림 문자
                </h3>

                {/* Description */}
                <p
                  className="font-medium text-black text-right"
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
                  학원방문 없이도 OK! 문자로 교육비 결제를 간편하게 받아보세요.
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
                  className="font-medium text-black text-right z-20"
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
  );
}

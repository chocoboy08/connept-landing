import { useEffect, useRef, useState, forwardRef } from "react";
import apply from "../assets/icon_apply.svg";

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

interface InquiryType {
  name: string;
  contact: string;
  email: string;
  inquiry: string;
}

export const FifthPage = forwardRef<HTMLDivElement>((props, ref) => {
  const [formData, setFormData] = useState<InquiryType>({
    name: "",
    contact: "",
    email: "",
    inquiry: "",
  });

  const postInquiry = async (data: InquiryType) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/promotion/inquiry`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.contact ||
      !formData.inquiry ||
      !formData.email
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    const response = await postInquiry(formData);
    console.log(response);
  };

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
    <div
      ref={ref}
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
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
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
                value={formData.contact}
                onChange={(e) => {
                  setFormData({ ...formData, contact: e.target.value });
                }}
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
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
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
                value={formData.inquiry}
                onChange={(e) => {
                  setFormData({ ...formData, inquiry: e.target.value });
                }}
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
              onClick={handleSubmit}
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
  );
});

FifthPage.displayName = "FifthPage";

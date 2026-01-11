import notebook from "../assets/notebook_1.svg";

interface ThirdPageProps {
  featureBoxes: {
    row1: string[];
    row2: string[];
    row3: string[];
  };
}

export function ThirdPage({ featureBoxes }: ThirdPageProps) {
  return (
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
          {featureBoxes.row1.map((text) => (
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
          {featureBoxes.row2.map((text) => (
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
          ))}
        </div>

        {/* Row 3 - 2 items */}
        <div
          className="flex justify-center"
          style={{ gap: "clamp(12px, 1.5vw, 24px)" }}
        >
          {featureBoxes.row3.map((text) => (
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
  );
}

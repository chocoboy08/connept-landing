interface SecondPageProps {
  title: string;
}

export function SecondPage({ title }: SecondPageProps) {
  return (
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
        {title}
      </h2>
    </div>
  );
}

import { FifthPage } from "../components/FifthPage";
import { FirstPage } from "../components/FirstPage";
import { FourthPage } from "../components/FourthPage";
import { SecondPage } from "../components/SecondPage";
import { ThirdPage } from "../components/ThirdPage";
import type { LandingType } from "../config/landingContent";
import { landingContent } from "../config/landingContent";

interface LandingPageProps {
  type: LandingType;
}

export function LandingPage({ type }: LandingPageProps) {
  const content = landingContent[type];

  return (
    <div className="h-screen overflow-y-scroll overflow-x-hidden">
      <FirstPage />
      <SecondPage title={content.secondPage.title} />
      <ThirdPage featureBoxes={content.thirdPage.featureBoxes} />
      <FourthPage
        showOperationManagement={content.fourthPage.showOperationManagement}
      />
      <FifthPage />
    </div>
  );
}

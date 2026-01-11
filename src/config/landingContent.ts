export type LandingType = "teacher" | "academy";

export interface LandingContent {
  secondPage: {
    title: string;
  };
  thirdPage: {
    featureBoxes: {
      row1: string[];
      row2: string[];
      row3: string[];
    };
  };
  fourthPage: {
    showOperationManagement: boolean;
  };
}

export const landingContent: Record<LandingType, LandingContent> = {
  academy: {
    secondPage: {
      title: "운영은 더 쉽게\n관리는 더 체계적으로",
    },
    thirdPage: {
      featureBoxes: {
        row1: ["출결 체크", "결제 관리"],
        row2: ["클리닉 자료 제작", "주 · 월간 복습테스트", "수행평가관리"],
        row3: ["시험대비", "모의고사준비"],
      },
    },
    fourthPage: {
      showOperationManagement: true,
    },
  },
  teacher: {
    secondPage: {
      title: "반복 업무는 더 쉽게\n관리는 더 체계적으로",
    },
    thirdPage: {
      featureBoxes: {
        row1: ["단어 시험지 제작", "재시험 관리"],
        row2: ["클리닉 자료 제작", "주 · 월간 복습테스트", "수행평가관리"],
        row3: ["시험대비", "모의고사준비"],
      },
    },
    fourthPage: {
      showOperationManagement: false,
    },
  },
};

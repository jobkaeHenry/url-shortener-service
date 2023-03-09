import { SkeletonRepeated } from "@/components/atom/Skeleton";
import { ReactElement, Suspense, useState } from "react";

const useMultistepForm = (steps: ReactElement[], initialPage?: number) => {
  const [currentIndex, setCurrentIndex] = useState(
    initialPage ? initialPage : 0
  );

  /** 현재 index 직후의 컴포넌트로 이동하게 하는 함수 */
  const next = () => {
    setCurrentIndex((prev) => {
      if (prev < steps.length - 1) {
        return prev + 1;
      } else return prev;
    });
  };
  /** 현재 index 직전의 컴포넌트로 이동하게 하는 함수 */
  const back = () => {
    setCurrentIndex((prev) => {
      if (prev >= 0) {
        return prev - 1;
      } else return prev;
    });
  };

  /** number 타입의 Index 를 받아서 해당 index의 해당 index에 해당하는 컴포넌트로 이동하게 하는 함수 */
  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  /** 현재페이지가 첫 페이지인지 여부 */
  const isFirstStep = currentIndex === 0;

  /** 현재페이지가 마지막 페이지인지 여부 */
  const isLastStep = currentIndex === steps.length - 1;

  return {
    currentIndex,
    totalPageNum: steps.length,
    next,
    back,
    goTo,
    step: (
      <Suspense fallback={<SkeletonRepeated />}>{steps[currentIndex]}</Suspense>
    ),
    isFirstStep,
    isLastStep,
  };
};

export default useMultistepForm;

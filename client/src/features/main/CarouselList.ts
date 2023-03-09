import imageA from "@/assets/service2_01.png";
import imageB from "@/assets/service5_01.png";
import imageC from "@/assets/service6_01.png";
import { CarouselElemType } from "@/types/carousel/carouselElem";

export const CarouselList: Omit<CarouselElemType, "index">[] = [
  {
    imageUrl: imageA,
    title: "안녕하세요 프론트엔드 이준구입니다",
    content: "빠르고 편리한 URL 단축 웹사이트입니다",
  },
  {
    imageUrl: imageB,
    title: "Dozn 과제로 진행된 프로젝트입니다",
    content: "빠르고 편리한 URL 단축 웹사이트입니다",
  },
  {
    imageUrl: imageC,
    title: "유용하셨다면 참 다행입니다",
    content: "추후 광고를 붙힐 수 있는 영역입니다",
  },
];

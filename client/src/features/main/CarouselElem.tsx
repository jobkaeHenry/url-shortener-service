import Text from "@/components/atom/Text";
import { ColumnWrapper } from "@/layouts/Wrapper";
import styled from "@emotion/styled";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CarouselElemType } from "@/types/carousel/carouselElem";

const CarouselElem = (props: CarouselElemType) => (
  <BackDrop>
    <CarouselWrapper>
      <ColumnWrapper>
        <Text typography="h1" bold>
          {props.title}
        </Text>
        <Text typography="p">{props.content}</Text>
      </ColumnWrapper>

      <img src={props.imageUrl} alt={`더즌의 소개 이미지 ${props.index}`} />
    </CarouselWrapper>
  </BackDrop>
);

const BackDrop = styled.div`
  width: 100vw;
  height: 50vh;
  background: linear-gradient(
    180deg,
    rgb(10, 41, 88) 0%,
    rgb(23, 85, 142) 100%
  );
`;

const CarouselWrapper = styled.div`
  height: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-direction: row;
  margin: 0 auto;
  max-width: 1080px;
  & > img {
    height: 80%;
    width: 50%;
    overflow: hidden;
  }
  & > div {
    width: 100%;
  }
  & span {
    color: var(--pure-white);
  }
`;

export default CarouselElem;

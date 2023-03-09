import React from "react";
import { Carousel } from "react-responsive-carousel";
import CarouselElem from "./CarouselElem";

import { CarouselList } from "./CarouselList";

type Props = {};

const MainCarousel = (props: Props) => {
  return (
    <Carousel infiniteLoop autoPlay swipeable showThumbs={false}>
      {CarouselList.map((e, i) => {
        return <CarouselElem index={i} {...e} key={i} />;
      })}
    </Carousel>
  );
};

export default MainCarousel;

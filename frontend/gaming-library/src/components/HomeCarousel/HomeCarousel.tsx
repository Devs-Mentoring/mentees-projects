import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";

import { LIBRARY_ROUTE } from "../../MainRoute";
import { Game } from "../../globals/types/rawgTypes";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "./style.scss";

type PropTypes = {
  data: Array<Game>;
};

function HomeCarousel(props: PropTypes) {
  const { data } = props;

  // TODO change 'stretch' for mobile devices(and maybe more adjustments) - the font also
  return (
    <Swiper
      modules={[EffectCoverflow, Autoplay]}
      speed={800}
      effect="coverflow"
      coverflowEffect={{
        rotate: 50,
        stretch: 500,
        depth: 50,
        modifier: 1,
        slideShadows: false,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {data.map((item) => (
        <SwiperSlide key={`${item.name}slide`}>
          <Link to={`${LIBRARY_ROUTE}/${item.slug}`}>
            <img alt={`${item.name}Image`} src={item.background_image} />
            <h2 className="swiper-slide_caption">{item.name}</h2>
            <h5 className="swiper-slide_caption">{`Release date: ${item.released}`}</h5>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HomeCarousel;

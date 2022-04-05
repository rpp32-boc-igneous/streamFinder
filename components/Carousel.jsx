import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import VideoCard from './VideoCard.jsx';
import arrow from '../assets/Arrow.png';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

var previousResults = null;

var Carousel = (props) => {

  var searchResults = props.searchResults;
  var trending = props.trending;
  var newResults = false;
  var carousel = true;

  // var swiper = $('.swiper-container').swiper({
  //   onSlideChangeStart: function(){
  //     // on the first slide
  //     if (swiper.activeIndex==0) {
  //       $('.left-arrow').hide()
  //       $('.right-arrow').show()
  //     }
  //     // most right postion
  //     else if (swiper.activeIndex == swiper.slides.length-1) {
  //       $('.left-arrow').show()
  //       $('.right-arrow').hide()
  //     }
  //     // middle positions
  //     else {
  //       $('.left-arrow').show()
  //       $('.right-arrow').show()
  //     }
  //   }
  // })

  if (JSON.stringify(searchResults) !== JSON.stringify(previousResults)) {
    previousResults = searchResults;
    newResults = true;
  }

  if (newResults) {
    return (
      <div id="carousel">{newResults.map(item =>
        <VideoCard program={item} />)
      }</div>
    )
  } else if (trending) {
    return (
      <div id="carousel">{trending.map(item =>
        <VideoCard program={item} />)
      }</div>
    )
  } else if (!carousel) {
    return (
      <div>carousel under construction</div>
    )
  } else {
    return (
      <div id="carouselBox">
        <img src={arrow} className="swiper-button-prev"></img>
        <div id="swiperBox">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            speed={800}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={((swiper) => console.log(swiper))}
          >
            <SwiperSlide className="videoCard">Video Card 1</SwiperSlide>
            <SwiperSlide className="videoCard">Video Card 2</SwiperSlide>
            <SwiperSlide className="videoCard">Video Card 3</SwiperSlide>
            <SwiperSlide className="videoCard">Video Card 4</SwiperSlide>
            <SwiperSlide className="videoCard">Video Card 5</SwiperSlide>
          </Swiper>
        </div>
        <img src={arrow} className="swiper-button-next"></img>
      </div>
    )
  }

}

export default Carousel;



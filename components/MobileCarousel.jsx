import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import MobileVideoCard from './MobileVideoCard.jsx';
import CarouselCount from './CarouselCount.jsx';
import arrow from '../assets/Arrow.png';
import $ from 'jquery';

//mock data
import { mockSearchResults } from '../mock_data/searchResults.js';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

var previousResults = null;

const MobileCarousel = (props) => {

  return (
    <div id='mobile-carousel'>
      <div id='carousel-box'>
        <img src={arrow} className='swiper-button-prev' id='left'></img>
        <div id='mobile-swiper-box'>
          <Swiper
            spaceBetween={2}
            slidesPerView={1}
            speed={500}
            loop='true'
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => null}
            onSwiper={((swiper) => console.log(swiper))}
          >{props.searchResults.map((title, i) =>
            <SwiperSlide key={i}><MobileVideoCard obj={title} selectTitle={props.displaySelectedTitle} index={i} carouselType={props.carouselType}/></SwiperSlide>
            )
          }</Swiper>
        </div>
        <img src={arrow} className='swiper-button-next' id='right'></img>
      </div>
      <div id="mobile-carousel-label">{props.carouselType === 'trending' ? (<div>Now trending...</div>) : (<CarouselCount searchTerm={props.searchTerm} />)}</div>
    </div>
  )

}




export default MobileCarousel;

//<CarouselCount index={this.state.currentSlidesIndex} length={this.state.currentSlidesLength} />


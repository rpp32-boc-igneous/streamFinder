import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import MiniVideoCard from './MiniVideoCard.jsx';
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

const Carousel = (props) => {

    return (
      <div id='desktop-carousel'>
      <div>{props.carouselType === 'trending' ? (<div>Now trending...</div>) : (<CarouselCount searchTerm={props.searchTerm} />)}</div>
        <div id='carousel-box'>
          <img src={arrow} className='swiper-button-prev' id='left'></img>
          <div id='swiper-box'>
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
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
              <SwiperSlide key={i}><MiniVideoCard obj={title} selectTitle={props.displaySelectedTitle} index={i} carouselType={props.carouselType}/></SwiperSlide>
              )
            }</Swiper>
          </div>
          <img src={arrow} className='swiper-button-next' id='right'></img>
        </div>
      </div>
    )

}




export default Carousel;

//<CarouselCount index={this.state.currentSlidesIndex} length={this.state.currentSlidesLength} />


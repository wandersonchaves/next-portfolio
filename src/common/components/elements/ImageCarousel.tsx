import type { MutableRefObject } from 'react';
import { ComponentType, useEffect, useRef } from 'react';
import type { Settings } from 'react-slick';
import SlickSlider from 'react-slick';
import { useWindowSize } from 'usehooks-ts';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from './Image';

const Slider = SlickSlider as unknown as ComponentType<any>;

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

const ImageCarousel = ({ images, interval = 3000 }: ImageCarouselProps) => {
  const sliderRef: MutableRefObject<SlickSlider | null> = useRef(null);
  const { width } = useWindowSize();
  const isMobile = width < 480;

  const getDeviceWidth = (): number => {
    if (width < 480) return 2;
    if (width <= 768) return 4;
    return 5;
  };

  useEffect(() => {
    const slider = sliderRef.current;

    const startScrolling = () => {
      slider?.slickPlay();
    };

    const stopScrolling = () => {
      slider?.slickPause();
    };

    const sliderList = slider?.innerSlider?.list;
    if (sliderList) {
      sliderList.addEventListener('mouseenter', stopScrolling);
      sliderList.addEventListener('mouseleave', startScrolling);
      startScrolling();
    }

    return () => {
      if (sliderList) {
        sliderList.removeEventListener('mouseenter', stopScrolling);
        sliderList.removeEventListener('mouseleave', startScrolling);
      }
    };
  }, []);

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: interval,
    slidesToShow: getDeviceWidth(),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: interval,
    cssEase: 'linear',
  };

  return (
    <Slider ref={sliderRef} {...settings} className='pt-5'>
      {images.map((image, index) => (
        <div key={index}>
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            width={isMobile ? 130 : 145}
            height={50}
            rounded='rounded-full'
            className='rounded-full bg-light px-3 hover:shadow-xl'
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;

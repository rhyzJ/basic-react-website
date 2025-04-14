import React from "react";
import Slider from "react-slick";

interface ImageCarouselProps {
  images: { title: string; url: string }[];
  links: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, links }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Slider {...settings}>
        {images.map((item, index) => (
          <div key={index} className="relative group">
            <a href={links[index]} target="_blank" rel="noopener noreferrer">
              <img
                src={item.url}
                alt={item.title}
                className="rounded-lg w-full h-[300px] object-cover object-center shadow-md"
              />
            </a>

            {/* overlay for hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded">
              {item.title}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;

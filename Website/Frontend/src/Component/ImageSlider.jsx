import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = ({ data, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let timer;
    if (autoplay) {
      timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % data.length);
      }, interval);
    }

    return () => clearInterval(timer);
  }, [data.length, interval, autoplay]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? data.length - 1 : prev - 1));
    setAutoplay(false);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % data.length);
    setAutoplay(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto h-96 overflow-hidden ">
      {data.map((item, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={item.imgsrc || "/api/placeholder/400/320"}
              alt={item.name}
              className="absolute w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-transparent bg-opacity-50 text-black text-center py-2">
              {item.name}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button 
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft size={14} />
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight size={14} />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setAutoplay(false);
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
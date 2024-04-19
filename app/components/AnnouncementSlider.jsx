import React, {useState, useEffect} from 'react';

const AnnouncementSlider = () => {
  const [index, setIndex] = useState(0);
  const announcements = [
    {text: '🚚 ENJOY FREE SHIPPING ON ORDERS OVER $75'},
    {text: '🎉 BIG SALE! UP TO 50% OFF ON SELECTED ITEMS'},
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="announcement-container bg-black text-white p-2 fixed w-full top-0 left-0 z-50">
      <div className="overflow-hidden h-6 flex flex-col items-center justify-center">
        {announcements.map((announcement, idx) => (
          <div
            key={idx}
            className={`transition-all duration-500 ${
              idx === index
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-full'
            }`}
            style={{height: '100%', display: idx === index ? 'block' : 'none'}}
          >
            <span
              className="announcement-container--text text-center uppercase"
              style={{marginTop: '50%'}}
            >
              {announcement.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementSlider;

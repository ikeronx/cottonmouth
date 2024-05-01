import React, {useState, useEffect} from 'react';

const AnnouncementSlider = () => {
  const [index, setIndex] = useState(0);
  const [hideAnnouncement, setHideAnnouncement] = useState(false);
  const announcements = [
    {text: '🚚 ENJOY FREE SHIPPING ON ORDERS OVER $75'},
    {text: '🎉 BIG SALE! UP TO 50% OFF ON SELECTED ITEMS'},
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 15000);

    // Clean up the interval
    return () => clearInterval(interval);
  }, [announcements.length]);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Check if the user has scrolled down more than 100 pixels
      if (window.scrollY > 100) {
        // If scrolled down, hide the announcement bar
        setHideAnnouncement(true);
      } else {
        // If not scrolled down, show the announcement bar
        setHideAnnouncement(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to run this effect only once on component mount

  return (
    <div
      className={`announcement-container bg-black text-white p-2 fixed w-full top-0 left-0 z-50 ${
        hideAnnouncement ? 'hidden' : ''
      }`}
    >
      <div className="announcement-container--text overflow-hidden h-4 flex flex-col items-center justify-center">
        {announcements.map((announcement, idx) => (
          <div
            key={idx}
            className={`announcement-slide transition-transform duration-1000 ${
              idx === index
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-full'
            }`}
            style={{
              width: '100%', // Ensure full width
              display: 'flex',
              alignItems: 'center', // Center text vertically
              justifyContent: 'center', // Center text horizontally
              position: 'absolute', // Position absolutely within parent
              right: 0, // Position from the right side
              top: 0, // Align to the top
            }}
          >
            <span className="announcement-container--text text-center uppercase">
              {announcement.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementSlider;

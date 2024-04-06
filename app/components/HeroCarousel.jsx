import React, {useState, useEffect} from 'react';

// Slide Data
const slideData = [
  {
    id: 1,
    subheading: '',
    heading: 'Hot New Releases',
    description: 'Brand new drops, brand new reasons to go gym.',
    ctaLink: '/collections/women',
    ctaText: 'Shop Now',
    image: '/images/hero/hero-women-1.png',
  },
  {
    id: 2,
    subheading: '',
    heading: 'THE ESSENTIALS',
    description: 'Simplicity Never Looked Better! We Have The Best .',
    ctaLink: '/collections/women',
    ctaText: 'Shop Now',
    image: '/images/hero/hero-4.png',
  },
  {
    id: 3,
    subheading: '',
    heading: 'THE ESSENTIALS',
    description: 'Simplicity Never Looked Better! We Have The Best .',
    ctaLink: '/collections/women',
    ctaText: 'Shop Now',
    image: '/images/hero/hero-women-2.jpeg',
  },
];

function HeroCarousel() {
  // State for managing slides and current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextClicked, setNextClicked] = useState(false);

  // Styles for CTA button based on the index of the slide
  const ctaBtnStyles = [
    {backgroundColor: '#ffffff', color: '#000000'},
    {backgroundColor: '#ffffff', color: '#000000'},
  ];

  // Text styles for subheading, heading, and description based on the index of the slide
  const textStyles = [{color: '#ffffff'}, {color: '#ffffff'}];

  // Function to handle click on the "Previous" button
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slideData.length - 1 : prevSlide - 1,
    );
    setNextClicked(false);
  };

  // Function to handle click on the "Next" button
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slideData.length - 1 ? 0 : prevSlide + 1,
    );
    setNextClicked(true);
  };

  // Function to handle click on slide indicators
  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, [currentSlide]); // Reset interval when currentSlide changes

  return (
    <>
      <style>
        {`
          .slide-container {
            margin: 0;
            font-family: 'Montserrat', sans-serif;
            position: relative;
            height: 70.3rem;
            height: 100vh;
            overflow: hidden;
          }

          .slide {
            width: min(90%, 120.5rem);
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr;
            align-items: center;
            row-gap: 5rem;
            transition: opacity 0.5s ease, visibility 0.5s ease;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: top;
          }

          .slide--textbox {
            position: absolute;
            color: #ffffff;
            width: 100%;
            transform: translate(-50%, -50%);
            top: 77%;
            left: 50%;
            padding: 0 2.4rem;
            text-align: center;
            @media (min-width: 45em) {
              padding: 0 7rem;
              text-align: left;
            }
            text-transform: uppercase;
          }

          .primary-heading {
            font-size: 3.0rem;
            font-weight: 600;
            margin-bottom: 0.3rem;
            line-height: 1.2;
          }

          .primary-heading-pre {
            font-size: 1rem;
            font-weight: 100;
            text-transform: uppercase;
          }

          .primary-heading--sub {
            font-size: 1.4rem;
            font-weight: 200;
            letter-spacing: 0.2px;
            margin-bottom: 1.3rem;
            line-height: 1.7;
          }

          .ctaBtn,
          .ctaBtn:link,
          .ctaBtn:visited {
            display: inline-block;
            font-size: 1.2rem;
            text-decoration: none;
            font-weight: 200;
            color: #ffffff;
            letter-spacing: 0.1px;
            text-transform: uppercase;
            padding: 1.2rem 5rem;
            width: auto;
            cursor: pointer;
            font-family: inherit;
            transition: all 0.3s;
          }

          .ctaBtn:hover,
          .ctaBtn:active {
            background-color: #000000;
          }

          .prev-btn,
          .next-btn {
            position: absolute;
            background-color: transparent !important;
            border: none;
            cursor: pointer;
            place-items: center;
            transition: 0.3s ease-in-out all;
            z-index: 1000;
          }

          .prev-btn {
            left: 0;
            top: 50%;
            transform: translate(22%, -50%);
          }

          .next-btn {
            right: 0;
            top: 50%;
            transform: translate(-22%, -50%);
          }

          .btn-icon {
            height: 7rem;
            width: 7rem;
            stroke: #ffffff;
            transition: 0.3s ease-in-out all;
            opacity: 0.5;
          }

          .btn-icon:hover {
            opacity: 1;
          }

          .indicators {
            position: absolute;
            top: 82.5%;
            right: 3.4%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 100;
            background-color: #637280;
            padding: 5px;
            border-radius: 5rem;
          }

          .indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #ffffff;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .indicator.active {
            background-color: #000;
          }
        `}
      </style>

      <section
        className={`slide-container ${nextClicked ? 'next-clicked' : ''}`}
      >
        {slideData.map((slide, slideIndex) => {
          const {id, subheading, heading, description, ctaLink, ctaText} =
            slide;
          return (
            <div
              className="slide"
              style={{
                opacity: slideIndex === currentSlide ? 1 : 0,
                visibility: slideIndex === currentSlide ? 'visible' : 'hidden',
                backgroundImage: `url(${slide.image})`,
              }}
              key={id}
            >
              <div className="slide--textbox">
                <span
                  className="primary-heading--pre"
                  style={textStyles[slideIndex]}
                >
                  {subheading}
                </span>
                <h1 className="primary-heading" style={textStyles[slideIndex]}>
                  {heading}
                </h1>
                <div className="slide-description-container">
                  <h2
                    className="primary-heading--sub"
                    style={textStyles[slideIndex]}
                  >
                    {description}
                  </h2>
                </div>
                <a
                  className="ctaBtn"
                  href={ctaLink}
                  style={ctaBtnStyles[slideIndex]}
                >
                  {ctaText}
                </a>
              </div>
            </div>
          );
        })}
        <div className="indicators hidden">
          {slideData.map((_, index) => (
            <div
              key={index}
              className={`hidden md:block indicator ${
                index === currentSlide ? 'active' : ''
              }`}
              onClick={() => handleIndicatorClick(index)}
            ></div>
          ))}
        </div>
        {/* <button
            type="button"
            className={`hidden md:block absolute top-1/2 left-3 md:left-6 transform -translate-y-1/2`}
            onClick={prevSlide}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="btn-icon"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                />
            </svg>
        </button>
        <button
            type="button"
            className={`hidden md:block absolute top-1/2 right-3 md:right-6 transform -translate-y-1/2`}
            onClick={nextSlide}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="btn-icon button-svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    style={{width: '100%', height: '100%'}}
                />
            </svg>
        </button> */}
      </section>
    </>
  );
}

export default HeroCarousel;

import React, {useState, useEffect} from 'react';

const slideData = [
  {
    id: 1,
    subheading: '',
    heading: 'Hot New Releases',
    description: 'Brand new drops, brand new reasons to go gym.',
    ctaLink: '/collections/women',
    ctaText: 'Shop Now',
    image: '/images/hero/103.png',
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
];

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slideData.length - 1 ? 0 : prevSlide + 1,
      );
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, []);

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
            transition: opacity 0.5s ease-in-out;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: top;
            opacity: 0;
          }

        .slide--textbox {
            position: absolute;
            color: #fff;
            width: 100%;
            transform: translate(-50%, -50%) translateY(100%);
            top: 77%;
            left: 50%;
            padding: 0 2.4rem;
            text-align: center;
            @media (min-width: 45em) {
                padding: 0 10rem;
                text-align: left;
            }
            text-transform: uppercase;
            animation: fadeInUp 1.5s ease forwards;
            }

            @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) translateY(100%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) translateY(0);
            }
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

            /* Use a more specific selector */
            .ctaBtn,
            .ctaBtn:link,
            .ctaBtn:visited {
                display: inline-block;
                font-size: 1.2rem;
                text-decoration: none;
                font-weight: 200;
                letter-spacing: 0.1px;
                text-transform: uppercase;
                padding: 1.2rem 5rem;
                width: auto;
                cursor: pointer;
                font-family: inherit;
                transition: all 0.3s;
            }

            .custom-ctaBtn {
                background-color: #fff !important;
                color: #000 !important;
            }

            .custom-ctaBtn:hover,
            .custom-ctaBtn:active {
                background-color: #dedede !important;
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

      <section className="slide-container">
        {slideData.map((slide, slideIndex) => (
          <div
            className="slide"
            style={{
              opacity: slideIndex === currentSlide ? 1 : 0,
              backgroundImage: `url(${slide.image})`,
            }}
            key={slide.id}
          >
            <div className="slide--textbox">
              <span className="primary-heading--pre">{slide.subheading}</span>
              <h1 className="primary-heading">{slide.heading}</h1>
              <div className="slide-description-container">
                <h2 className="primary-heading--sub">{slide.description}</h2>
              </div>
              <a className="ctaBtn custom-ctaBtn" href={slide.ctaLink}>
                {slide.ctaText}
              </a>
            </div>
          </div>
        ))}
        <div className="indicators hidden">
          {slideData.map((_, index) => (
            <div
              key={index}
              className={`hidden md:block indicator ${
                index === currentSlide ? 'active' : ''
              }`}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>
      </section>
    </>
  );
}

export default HeroCarousel;

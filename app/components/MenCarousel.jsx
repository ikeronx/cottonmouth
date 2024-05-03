import React, {useState, useEffect} from 'react';

const slideData = [
  {
    id: 1,
    subheading: '',
    heading: 'Finishing Touch',
    description: 'Elevate your style',
    ctaLink: '/collections/accessories',
    ctaText: 'Shop Now',
    image: '/images/hero/hero-white.png',
  },
  {
    id: 2,
    subheading: '',
    heading: 'Accessorize Smart',
    description: 'Shop Accessories',
    ctaLink: '/collections/accessories',
    ctaText: 'Shop Now',
    image: '/images/hero/hero-white-2.png',
  },
];

function MenCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slideData.length - 1 ? 0 : prevSlide + 1,
      );
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, []);

  // Styles for CTA button based on the index of the slide
  const ctaBtnStyles = [
    {backgroundColor: '#1a1a1a', color: '#fff'},
    {backgroundColor: '#1a1a1a', color: '#fff'},
  ];

  // Text styles for subheading, heading, and description based on the index of the slid
  const textStyles = [{color: '#1a1a1a'}, {color: '#1a1a1a'}];

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
            top: 72.5%;
            left: 50%;
            padding: 0 4.4rem;
            text-align: center;
            @media (min-width: 45em) {
                padding: 0 7rem;
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

            .primary-heading--pre {
                display: inline-block;
                font-size: 1.4rem;
                font-weight: 300;
                text-transform: uppercase;
                // margin-bottom: 0.3rem;
            }

            .primary-heading--sub {
                font-size: 1.4rem;
                font-weight: 300;
                letter-spacing: 0.2px;
                margin-bottom: 2rem;
                @media (min-width: 45em) {
                  margin-bottom: 1.3rem;
                }
            }

            /* Use a more specific selector */
            .ctaBtn,
            .ctaBtn:link,
            .ctaBtn:visited {
                display: inline-block;
                font-size: 1.2rem;
                text-decoration: none;
                font-weight: 300;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                padding: 1.2rem 5rem;
                width: auto;
                cursor: pointer;
                font-family: inherit;
                transition: all 0.3s;
            }

            .custom-ctaBtn {
                // background-color: #fff !important;
                // color: #000 !important;
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
                background-color: #fff;
                padding: 5px;
                border-radius: 5rem;
                opacity: 0.5;
            }

            .indicator {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #999;
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
              <div
                className="primary-heading--pre"
                style={textStyles[slideIndex]}
              >
                {slide.subheading}
              </div>
              <h1 className="primary-heading" style={textStyles[slideIndex]}>
                {slide.heading}
              </h1>
              <div className="slide-description-container">
                <h2
                  className="primary-heading--sub"
                  style={textStyles[slideIndex]}
                >
                  {slide.description}
                </h2>
              </div>
              <a
                className="ctaBtn custom-ctaBtn"
                href={slide.ctaLink}
                style={ctaBtnStyles[slideIndex]}
              >
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

export default MenCarousel;

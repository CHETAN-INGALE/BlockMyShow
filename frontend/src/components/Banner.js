import React from "react";
import { Carousel } from "react-bootstrap";
import "../styles/Banner.css"; // Import custom styles

const Banner = () => {
  return (
    <div className="banner-container">
      <Carousel interval={3000} indicators={true} pause="hover">
        {/* Movie 1 */}
        <Carousel.Item>
          <img className="d-block w-100 banner-image" src="/images/movie1.jpg" alt="Movie 1" />
          <Carousel.Caption className="banner-text">
            <h2>🚀 The Biggest Blockbuster of 2025!</h2>
            <p>🔥 Now in Theaters Near You</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Movie 2 */}
        <Carousel.Item>
          <img className="d-block w-100 banner-image" src="/images/movie2.jpg" alt="Movie 2" />
          <Carousel.Caption className="banner-text">
            <h2>🎬 Action Thriller You Can't Miss!</h2>
            <p>Book Your Tickets Now 🍿</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Movie 3 */}
        <Carousel.Item>
          <img className="d-block w-100 banner-image" src="/images/movie3.jpg" alt="Movie 3" />
          <Carousel.Caption className="banner-text">
            <h2>✨ A Magical Adventure Awaits</h2>
            <p>Only in Cinemas 🏆</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;

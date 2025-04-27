import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/book/${movie.event_name}/?poster_url=${movie.poster_url}`);
  };

  return (
    <Card className="movie-card mb-4" style={{ width: "18rem", margin: "0 auto" }}>
      <div style={{ height: "25vw", width: "100%", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={movie.poster_url}
          alt={movie.event_name}
          style={{ objectFit: "fill", height: "100%", width: "100%" }}
        />
      </div>
      <Card.Body>
        <Card.Title style={{ fontSize: "clamp(0.8rem, 1.5vw, 1.2rem)", display: "flex", justifyContent: "center" }}>
          <strong>{movie.event_name}</strong>
        </Card.Title>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="primary"
            onClick={handleBookNow}
            style={{ fontSize: "clamp(0.6rem, 1.5vw, 1rem)", padding: "0.5em 1em" }}
          >
            Book Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;

import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/book/${movie.title.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.poster} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Button variant="danger" onClick={handleBooking}>
          🎟️ Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;

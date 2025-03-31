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
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.poster_url} alt={movie.event_name} />
      <Card.Body>
        <Card.Title>{movie.event_name}</Card.Title>
        <Button variant="primary" onClick={handleBookNow}>
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;

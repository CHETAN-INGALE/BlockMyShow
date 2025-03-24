import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.poster} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Button variant="primary" onClick={() => navigate(`/book/${movie.title}`)}>
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;

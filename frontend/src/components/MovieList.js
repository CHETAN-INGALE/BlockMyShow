import React from "react";
import MovieCard from "./MovieCard";
import { Container, Row, Col } from "react-bootstrap";

const MovieList = () => {
  const movies = [
    { title: "Avengers", poster: "/images/avengers.jpg" },
    { title: "Batman", poster: "/images/batman.jpg" },
    { title: "Spiderman", poster: "/images/spiderman.jpg" },
  ];

  return (
    <Container>
      <h2 className="my-4">Now Showing</h2>
      <Row>
        {movies.map((movie, index) => (
          <Col key={index} sm={4}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;

import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import movieAPI from "../api/movieApi";

const MovieList = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [movies, setMovies] = useState([]);
  const hasRunAuth = React.useRef(false);

  useEffect(() => {
    if (hasRunAuth.current) return;
    hasRunAuth.current = true;
    movieAPI.getMovies(20).then((response) => {
      if (isHomePage) {
        setMovies(response.data.slice(0, 6));
      } else {
        setMovies(response.data);
      }
    });
  }, [isHomePage]);

  return (
    <Container>
      <h2 className="my-4">Now Showing</h2>
      <Row>
        {movies.map((movie, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;

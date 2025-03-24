import React from "react";
import MovieCard from "./MovieCard";
import { Container, Row, Col } from "react-bootstrap";

const MovieList = () => {
  const movies = [
    { title: "Avengers", poster: "/images/avengers.jpg" },
    { title: "Batman", poster: "/images/batman.jpg" },
    { title: "Spiderman", poster: "/images/spiderman.jpg" },
    { title: "Chhava", poster: "/images/chhava.jpg" },
    { title: "The Diplomat", poster: "/images/diplomat.jpg" },
    { title: "Deva", poster: "/images/deva.jpg" },
    { title: "Flow", poster: "/images/flow.jpg" },
    { title: "Baida", poster: "/images/baida.jpg" },
    { title: "Locked", poster: "/images/rd.jpg" },
    { title: "A Complete Unknown", poster: "/images/acm.jpg" },
    { title: "Sairat", poster: "/images/sairat.jpg" },
    { title: "Interstellar", poster: "/images/int.jpg" },
    { title: "Mufasa: The Lion King", poster: "/images/muf.jpg" },
    { title: "Captain America: Brave New World", poster: "/images/ca.jpg" },
    { title: "Yodha", poster: "/images/yodha.jpg" },

    
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

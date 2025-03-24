import React from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const BookingPage = () => {
  const { movieName } = useParams();

  return (
    <Container className="text-center mt-5">
      <h2>🎬 Booking for {movieName.replace("-", " ")}</h2>
      <p>Fill in your details to confirm your booking.</p>
      <Button variant="success">Proceed to Payment</Button>
    </Container>
  );
};

export default BookingPage;

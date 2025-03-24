import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const BookingPage = () => {
  const { movieName } = useParams(); // Get movie name from URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tickets: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed!\nMovie: ${movieName}\nName: ${formData.name}\nTickets: ${formData.tickets}`);
    // Redirect to payment page or API call
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">🎟️ Booking for {movieName}</h2>

      <Row>
        {/* Left Column - Booking Form */}
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number of Tickets</Form.Label>
              <Form.Control type="number" name="tickets" min="1" value={formData.tickets} onChange={handleChange} required />
            </Form.Group>

            <Button variant="success" type="submit">Proceed to Payment</Button>
          </Form>
        </Col>
      
        {/* Right Column - Optional: Add Movie Poster or Info */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <img src={`/images/${movieName.toLowerCase()}.jpg`} alt={movieName} style={{ width: "80%", borderRadius: "8px" }} />
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;

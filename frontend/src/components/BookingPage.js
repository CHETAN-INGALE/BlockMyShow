import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';

import {getCookie} from "../utils/cookie"; // Import Cookie Utility
import movieAPI from "../api/movieApi";
import bookingAPI from "../api/bookingApi";
import formatDate from "../utils/date"; // Import formatDate utility




const BookingPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { movieName } = useParams();
  const posterUrl = queryParams.get("poster_url");

  const [movieDetails, setMovieDetails] = useState({ movieName: movieName });
  const [blockBooking, setblockBooking] = useState(false);
  
  const [formData, setFormData] = useState({
    tickets: 1,
  });
  
  useEffect(() => {
    // Fetch movie details using the movieName from the URL
    movieAPI.getMovieByName(movieDetails).then((res) => {
      if (res.status === 200) {
        setMovieDetails(res.data);
        console.log(res);
      }
    });
    if (movieDetails.available_seats === 0) {
      alert("No tickets available for this movie.");
      setblockBooking(true);
  }

    // eslint-disable-next-line 
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed!\nMovie: ${movieName}\nTickets: ${formData.tickets}`);
    // Redirect to payment page or API call
    let bookingDetails = {
      userId:JSON.parse(localStorage.getItem("userInfo")).userId,
      userSessionKey:getCookie("sessionKey"),
      eventId:movieDetails._id,
      eventSeats:formData.tickets
    };
    bookingAPI.bookTickets(bookingDetails).then((res) => {
      if (res.status === 200) {
        alert("Booking Successful!");
        console.log(res);
      } else {
        alert("Booking Failed!");
      }
    }
    ).catch((error) => {
      console.error("Error booking tickets:", error);
      alert("Booking Failed!");
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">🎟️ Booking for {movieName}</h2>
      <hr />
      <Row>
        {/* Left Column - Booking Form */}
        <Col md={6}>
          <p><strong>Event Date: </strong>{formatDate(movieDetails.event_datetime)}</p>
          <p><strong>Rating: </strong><Rate count={5}value={movieDetails.rating_value/2} disabled={true} /> </p>
          <p><strong>Location: </strong>{movieDetails.location}</p>
          <p><strong>Ticket Price: </strong>₹{movieDetails.ticket_price}</p>
          <p><strong>Available Seats: </strong>{movieDetails.available_seats}/{movieDetails.total_seats}</p>
          <p><strong>Description: </strong>{movieDetails.event_description}</p>

        </Col>

        {/* Right Column - Optional: Add Movie Poster or Info */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <img src={posterUrl} alt={movieName} style={{ width: "80%", borderRadius: "8px" }} />
        </Col>
      </Row>

      <hr />
      <Row className="mt-4">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><strong>Number of Tickets</strong></Form.Label>
              <Form.Control  type="number" name="tickets" min="1" value={formData.tickets} onChange={handleChange} required />
            </Form.Group>
            <Button disabled={blockBooking} variant="success" type="submit">Proceed to Payment</Button>
          </Form>
        </Col>
      </Row>

    </Container>
  );
};

export default BookingPage;

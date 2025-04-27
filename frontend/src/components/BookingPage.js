import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button ,Modal} from "react-bootstrap";

import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import { toast } from 'react-toastify';
// Removed unused import for paymentSound

import { getCookie } from "../utils/cookie"; // Import Cookie Utility
import movieAPI from "../api/movieApi";
import bookingAPI from "../api/bookingApi";
import formatDate from "../utils/date"; // Import formatDate utility
import paymentSound from "../assets/pay.mp3"; // Import payment sound



const BookingPage = () => {
  const { movieName } = useParams();

  const [movieDetails, setMovieDetails] = useState({ movieName: movieName });
  const [blockBooking, setblockBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigator = useNavigate();
  const handlePaymentClose = () => setShowPayment(false);
  const handlePaymentShow = () => setShowPayment(true);
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    new Audio(paymentSound).play();
    setShowPayment(false);
    toast.success("Payment Successful!");
    setTimeout(() => {
      navigator("/tickets");
  }, 5000);    
    
    // console.log("Payment Method:", paymentMethod);

  };

  const [formData, setFormData] = useState({
    tickets: 1,
  });

  useEffect(() => {
    // Fetch movie details using the movieName from the URL
    movieAPI.getMovieByName(movieDetails).then((res) => {
      if (res.status === 200) {
        setMovieDetails(res.data);
        console.log(movieDetails.poster_url);
      }
    });
    if (movieDetails.available_seats === 0) {
      toast.error("No tickets available for this movie.");
      setblockBooking(true);
    }

    // eslint-disable-next-line 
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to payment page or API call
    let bookingDetails = {
      userId: JSON.parse(localStorage.getItem("userInfo")).userId,
      userSessionKey: getCookie("sessionKey"),
      eventId: movieDetails._id,
      eventSeats: formData.tickets
    };
    bookingAPI.bookTickets(bookingDetails).then((res) => {
      if (res.status === 200) {
        handlePaymentShow();
      } else {
        toast.error("Booking Failed!");
      }
    }
    ).catch((error) => {
      console.error("Error booking tickets:", error);
      toast.error("Booking Failed!");
    });
  };

  return (
    <>
    <Container className="mt-5">
      <h2 className="mb-4">🎟️ Booking for {movieName}</h2>
      <hr />
      <Row>
        {/* Left Column - Booking Form */}
        <Col md={6}>
          <p><strong>Event Date: </strong>{formatDate(movieDetails.event_datetime)}</p>
          {/* disable errors */}
          <div>
            <strong>Rating: </strong>
            <Rate count={5} value={movieDetails.rating_value / 2} disabled={true} />
          </div>
          <p><strong>Location: </strong>{movieDetails.location}</p>
          <p><strong>Ticket Price: </strong>₹{movieDetails.ticket_price}</p>
          <p><strong>Available Seats: </strong>{movieDetails.available_seats}/{movieDetails.total_seats}</p>
          <p><strong>Description: </strong>{movieDetails.event_description}</p>

          {/* Payment Model */}
          <Row className="mt-4">
            <Col md={12}>
              <h4>Payment Options</h4>
              <p>Select your preferred payment method at the next step.</p>
              <ul>
                <li>Credit/Debit Card</li>
                <li>UPI</li>
                <li>Net Banking</li>
                <li>Wallets</li>
              </ul>
            </Col>
          </Row>
        </Col>


        {/* Right Column - Optional: Add Movie Poster or Info */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <img src={movieDetails.poster_url} alt={movieName} style={{ height: "100%", width: "20vw", borderRadius: "8px", objectFit: "contain" }} />
        </Col>
      </Row>

      <hr />
      <Row className="mt-4">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><strong>Number of Tickets</strong></Form.Label>
              <Form.Control type="number" name="tickets" min="1" value={formData.tickets} onChange={handleChange} required />
            </Form.Group>
            <Button disabled={blockBooking} variant="success" type="submit">Proceed to Payment</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    {/* Payment Modal */}
    <Modal show={showPayment} onHide={handlePaymentClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlePaymentSubmit}>
          <Form.Group controlId="paymentMethod">
            <Form.Label>Select Payment Method</Form.Label>
            <Form.Control
              as="select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              <option value="creditCard">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netBanking">Net Banking</option>
              <option value="wallets">Wallets</option>
            </Form.Control>
          </Form.Group>
          <Button variant="success" type="submit" className="mt-3 w-100">
            Proceed
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default BookingPage;

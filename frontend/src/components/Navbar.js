import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Modal, Form, FormControl } from "react-bootstrap";
import authAPI from '../api/authApi';
import { getCookie, setCookie } from "../utils/cookie";

const NavigationBar = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  //const [sessionKey, setSessionKey] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedCookie = getCookie("sessionKey");
    if (storedEmail && storedCookie) {
      setIsAuthenticated(true);
      setEmail(storedEmail);
      //setSessionKey(storedCookie);
    }
  }, []);

  // Handle Login Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    let res = authAPI.login({ email: email });
    console.log(res);
    alert(`Email submitted: ${email}`);
    localStorage.setItem("email", email);
    setIsAuthenticated(true);
    handleClose();
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("email");
    setCookie("sessionKey",null); // Expire the session cookie
    setIsAuthenticated(false);
    window.location.reload(); // Refresh the page to update UI
  };

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">BlockMyShow</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Movies">Movies</Nav.Link>
            </Nav>

            {/* Centered Search Bar */}
            <Form className="d-flex mx-auto search-bar" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search movies, events..."
                className="me-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-light" type="submit">Search</Button>
            </Form>

            {/* Conditional Login / Logout Button */}
            {isAuthenticated ? (
              <Button variant="outline-light" className="ms-3" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline-light" className="ms-3" onClick={handleShow}>
                Login / Sign Up
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login / Sign Up Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login / Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="mt-3 w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Custom CSS to Center Search Bar */}
      <style>{`
        .search-bar {
          width: 40%;  /* Adjust width as needed */
        }
      `}</style>
    </>
  );
};

export default NavigationBar;

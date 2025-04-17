import React, { useState, useEffect } from "react";
import {Navbar,Nav,Container,Button,Modal,Form,FormControl,
} from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import authAPI from "../api/authApi";
import { getCookie, setCookie } from "../utils/cookie";

const NavigationBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
  });

  // Check if user is logged in
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedCookie = getCookie("sessionKey");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedEmail && storedCookie) {
      setIsAuthenticated(true);
      setEmail(storedEmail);
    }

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // Handle Login Modal
  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    authAPI.login({ email: email });
    alert(`Logged in as: ${email}`);
    localStorage.setItem("email", email);
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("email");
    setCookie("sessionKey", null);
    setIsAuthenticated(false);
    window.location.reload();
  };

  // Search
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("");
  };

  // User Form Modal
  const handleUserIconClick = () => {
    const savedInfo = localStorage.getItem("userInfo");
    if (savedInfo) {
      setUserInfo(JSON.parse(savedInfo));
    }
    setShowUserForm(true);
  };
  const handleUserFormClose = () => setShowUserForm(false);

  const handleUserInfoSave = (e) => {
    e.preventDefault();
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    alert("User details saved!");
    setShowUserForm(false);
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
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

            {/* Search */}
            <Form className="d-flex mx-auto search-bar" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search movies, events..."
                className="me-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </Form>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <Button variant="outline-light" className="ms-3" onClick={handleLogout}>
                  Logout
                </Button>
                <FaUserCircle
                  size={28}
                  style={{ color: "white", cursor: "pointer", marginLeft: "15px" }}
                  onClick={handleUserIconClick}
                />
              </>
            ) : (
              <Button variant="outline-light" className="ms-3" onClick={handleLoginShow}>
                Login / Sign Up
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={handleLoginClose} centered>
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

      {/* User Info Form Modal */}
      <Modal show={showUserForm} onHide={handleUserFormClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUserInfoSave}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                name="mobileNumber"
                value={userInfo.mobileNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="w-100">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Custom CSS */}
      <style>{`
        .search-bar {
          width: 40%;
        }
      `}</style>
    </>
  );
};

export default NavigationBar;

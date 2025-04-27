import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Modal, Form, FormControl, NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import authAPI from "../api/authApi";
import { getCookie, setCookie } from "../utils/cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  // Handle Login Modal
  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    authAPI.login({ email: email })
    //setIsAuthenticated(true);
    handleLoginClose();
  };

  // Logout
  const navigator = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("email");
    setCookie("sessionKey", null);
    alert("Logged out successfully");
    setEmail("");
    setUserInfo({
      firstName: "",
      lastName: "",
      mobileNumber: "",
    });
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    navigator("/");
  }
  // Search
  const handleSearch = (e) => {
    e.preventDefault();
    navigator(`/book/${searchQuery}`);
    console.log(`Searching for: ${searchQuery}`);
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
    const userData = {
      email: localStorage.getItem("email"),
      sessionKey: getCookie("sessionKey"),
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      mobileNumber: userInfo.mobileNumber,
    };
    authAPI.updateUser(userData)
      .then((res) => {
        if (res.status === 200) {
          setShowUserForm(false);
          alert("User details saved!");
          setIsAuthenticated(true);
        }
        else {
          alert("Error updating user details");
        }
      })
    setShowUserForm(false);
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Handle From Auth
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      if (location.state.from === "auth") {
        if (location.state?.status === "success") {
          setIsAuthenticated(true);
          toast.success("Authentication successful");
        }
        else if (location.state?.status === "missingData") {
          setShowUserForm(true);
          toast.info("Missing user data, please fill in your details");
        }
        else if (location.state) {
          console.log("Step 3: ", location.state.status);
          setShowLogin(true);
          setIsAuthenticated(false);
        }
      }
    }
  }, [location]);

  // Check Authentication
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedCookie = getCookie("sessionKey");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedEmail && storedCookie) {
      authAPI.auth({ email: storedEmail, sessionKey: storedCookie }).then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
          //setUserInfo(JSON.parse(storedUserInfo));
          setEmail(storedEmail);
          setCookie("sessionKey", storedCookie, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), path: "/" });
        }
      }).catch((error) => {
        localStorage.removeItem("email");
        localStorage.removeItem("userInfo");
        setIsAuthenticated(false);
        setEmail("");
        setUserInfo({
          firstName: "",
          lastName: "",
          mobileNumber: "",
        });
        setCookie("sessionKey", null, { expires: new Date(0) });
        setShowUserForm(false);
      });
    }

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
    // eslint-disable-next-line
  }, []);


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
            <NavDropdown
              title={<TiThMenu size={28} style={{ color: "white" }} />}
              id="basic-nav-dropdown"
              className="ms-3"
            >
              <NavDropdown.Item onClick={()=>{navigator("/nft")}}>NFT</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{navigator("/tickets")}}>Tickets</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{navigator("/about")}}>About</NavDropdown.Item>
            </NavDropdown>
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
            <Button variant="danger" className="w-100 mt-3" onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="dark" type="submit" className="w-100 mt-3">
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

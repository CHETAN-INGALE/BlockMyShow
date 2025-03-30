import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar";  // Import Navbar component
import Home from "./pages/Home";  // Import Home Page
import Footer from "./components/Footer";  // Import Footer
import BookingPage from "./components/BookingPage";  // Import Booking Page
import Auth from "./pages/Auth";  // Import Auth Page
import ProtectedRoute from "./utils/private"; // Import Protected Route
import {getCookie,setCookie} from "./utils/cookie"; // Import Cookie Utility

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />  

          {/* Protected Route for Booking Page */}
          <Route
            path="/book/:movieName"
            element={
              <ProtectedRoute
                email={localStorage.getItem("email")}
                sessionKey={getCookie("sessionKey")}>
                <BookingPage />
              </ProtectedRoute>
            }
          />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

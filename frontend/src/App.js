import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar";  // Import Navbar component
import Home from "./pages/Home";  // Import Home Page
import Footer from "./components/Footer";  // Import Footer
import BookingPage from "./components/BookingPage";  // Import Booking Page
import Movies from "./pages/Movies";  // Import Movies Page
// Import MovieList component
import Auth from "./pages/Auth";  // Import Auth Page
import ProtectedRoute from "./utils/private"; // Import Protected Route
import {getCookie} from "./utils/cookie"; // Import Cookie Utility



function App() {
  const [sessionKey, setSessionKey] = useState(getCookie("sessionKey"));

  useEffect(() => {
    const updatedSessionKey = getCookie("sessionKey");
    if (!updatedSessionKey) {
      console.warn("No session key found in cookies.");
    }
    setSessionKey(updatedSessionKey);
  }, []);
  return (
    <Router>
      <NavigationBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />  
          <Route path="/movies" element={<Movies />} />
          {/* Protected Route for Booking Page */}
          <Route
            path="/book/:movieName"
            element={
              <ProtectedRoute
                email={localStorage.getItem("email")}
                sessionKey={sessionKey}>
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

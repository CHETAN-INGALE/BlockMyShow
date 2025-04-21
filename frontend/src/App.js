import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar";  // Import Navbar component
import Home from "./pages/Home";  // Import Home Page
import Footer from "./components/Footer";  // Import Footer
import BookingPage from "./components/BookingPage";  // Import Booking Page
import Movies from "./pages/Movies";  // Import Movies Page
import Auth from "./pages/Auth";  // Import Auth Page
import NFT from "./pages/NFT";

import ProtectedRoute from "./utils/private"; // Import Protected Route
import {getCookie} from "./utils/cookie"; // Import Cookie Utility



function App() {
  const [sessionKey, setSessionKey] = useState(getCookie("sessionKey"));
  const hasRunAuth = React.useRef(false);
  useEffect(() => {
    if (hasRunAuth.current) return;
    hasRunAuth.current = true;
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
          <Route path="/nft" element={<NFT />} />
          <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

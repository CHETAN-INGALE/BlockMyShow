import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";  // Import Navbar component
import Home from "./pages/Home";  // Import Home Page
import Footer from "./components/Footer";  // Import Footer
import BookingPage from "./components/BookingPage";  // Import Booking Page

function App() {
  return (
    <Router>
      <NavigationBar />  {/* Display Navbar */}
      
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home Page Route */}
        <Route path="/book/:movieName" element={<BookingPage />} />  {/* Booking Page Route */}
      </Routes>
      
      <Footer />  {/* Display Footer */}
    </Router>
  );
}

export default App;  // Ensure only one export

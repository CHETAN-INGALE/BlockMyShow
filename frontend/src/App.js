import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import BookingPage from "./components/BookingPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:movieName" element={<BookingPage />} /> {/* Booking Page Route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

import React from "react";
import { Container } from "react-bootstrap";

const Footer = (Style) => {
  return (
    <footer
      className="bg-dark text-white text-center py-3 mt-4"
      style={{
        position: Style?.position || "relative",
        bottom: Style?.bottom || "0",
        width: Style?.width || "100%",
      }}
    >
      <Container>
        <p>© 2025 BlockMyShow | All Rights Reserved</p>
      </Container>
    </footer>
  );
};

export default Footer;

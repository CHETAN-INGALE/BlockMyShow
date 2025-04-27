import React from "react";
import { Card, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import "../../styles/TicketCard.css";

const TicketCard = ({ movieTitle, movieId, seatNumber, posterUrl }) => {
    const [ticketPopupVisible, setTicketPopupVisible] = React.useState(false);
    let stringqr = JSON.stringify({
        userId: JSON.parse(localStorage.getItem("userInfo")).userId,
        movieId: movieId,
        seatsBooked: seatNumber,
    });

    const handleViewDetails = () => {
        console.log("QR Code String:", stringqr);
        setTicketPopupVisible(true);

    };

    return (
        <>
            <Modal show={ticketPopupVisible} onHide={() => setTicketPopupVisible(false)} centered>
                <Modal.Body>
                    <br />
                    <div style={{ textAlign: "center" }}>
                        <QRCode value={stringqr} />
                    </div>
                    <h5 style={{ textAlign: "center", marginTop: "1rem" }}>
                        <strong>{movieTitle}</strong>
                    </h5>
                </Modal.Body>
            </Modal>
            <Card
                className="ticket-card mb-4"
                style={{
                    width: "18rem",
                    margin: "0 auto",
                    backgroundImage: `url(${posterUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(0.8)", // Slightly faded effect
                    color: "white", // Ensure text is visible
                }}
            >
                <Card.Body style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", borderRadius: "0.5rem" }}>
                    <Card.Title
                        style={{
                            fontSize: "clamp(0.8rem, 1.5vw, 1.2rem)",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <strong>{movieTitle}</strong>
                    </Card.Title>
                    <Card.Text style={{ fontSize: "clamp(0.7rem, 1.2vw, 1rem)" }}>
                        <span>Seat: {seatNumber}</span><br />
                    </Card.Text>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="primary"
                            onClick={handleViewDetails}
                            style={{ fontSize: "clamp(0.6rem, 1.5vw, 1rem)", padding: "0.5em 1em" }}
                        >
                            View Ticket
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default TicketCard;
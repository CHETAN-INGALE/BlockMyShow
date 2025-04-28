import React from "react";
import TicketCard from "./TicketCard";

const TicketList = ({ bookingDetails }) => {
    if (!bookingDetails || !bookingDetails.bookings || bookingDetails.bookings.length === 0) {
        return <p>No tickets found.</p>;
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
            {bookingDetails.bookings.map((booking, index) => (
                <TicketCard
                    key={index}
                    movieTitle={booking.movieName}
                    movieId={booking.movieId}
                    seatNumber={booking.seats.join(", ")}
                    posterUrl={booking.posterUrl || "https://live.staticflickr.com/6068/6111447610_291e2b499a_z.jpg"} // Default poster URL
                />
            ))}
        </div>
    );
};

export default TicketList;
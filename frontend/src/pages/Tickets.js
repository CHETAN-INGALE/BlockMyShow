import React, { useEffect } from "react";
import bookingAPI from "../api/bookingApi";
import { getCookie } from "../utils/cookie";
import TicketList from "../components/Ticket/TicketList";
const Tickets = () => {
    const [bookingDetails, setBookingDetails] = React.useState([]);
    useEffect(() => {
        let userDetails={
            userId: JSON.parse(localStorage.getItem("userInfo")).userId,
            userSessionKey: getCookie("sessionKey"),
        };
        bookingAPI.getBookingDetails(userDetails).then((booking) => {
            console.log("Booking Details", booking);
            setBookingDetails(booking);
        });
    }, []);

    return (
        <div style={{ minHeight: "77vh", display: "flex", flexDirection: "column" }}>
            <h1>Your Tickets</h1>
            <TicketList bookingDetails={bookingDetails} />
            <div style={{ flexGrow: 1 }}></div>
        </div>
    );


};

export default Tickets;



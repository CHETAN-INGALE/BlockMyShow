import React, { useEffect } from "react";

const Tickets = () => {
    useEffect(() => {
        // Fetch tickets data from API or local storage
    }, []);
    return (
        <div>
            Hello Tickets
            <p>Here you can view your booked tickets.</p>
        </div>
    );
};

export default Tickets;

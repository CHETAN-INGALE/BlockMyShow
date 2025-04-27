import React, { useState, useEffect } from "react";
import Scanner from "../components/scanner";


import bookingAPI from "../api/bookingApi";
import { toast } from "react-toastify";


const NFT = () => {
    const [decodedText, setDecodedText] = useState("");
    const [showScanner, setShowScanner] = useState(true);
    const [showStatus, setShowStatus] = useState(false);
    const handleDecodedText = (text) => {
        setDecodedText(text);

        setShowScanner(false);
        const cleanedText = text.replace(/\\/g, "");
        const validJsonText = cleanedText.replace(/'/g, '"');
        setDecodedText(validJsonText);

    };
    useEffect(() => {
        if (!showScanner) {
            bookingAPI.verifyBooking(decodedText).then((response) => {
                if (response.status === 200) {
                    toast.success("Booking Verified!");
                    setShowStatus(true);
                    setTimeout(() => {
                        setDecodedText("");
                        setShowScanner(true);
                        setShowStatus(false);
                    }, 5000);
                } else {
                    toast.error("Booking Verification Failed!");
                    setShowScanner(true);
                    setShowStatus(false);
                    setDecodedText("");
                }
            })

        }
        // eslint-disable-next-line
    }, [showScanner]);

    return (
        <div style={{ minHeight: "77vh", display: "flex", flexDirection: "column" }}>
            <h1>NFT</h1>
            {showScanner && <Scanner onDecode={handleDecodedText} />}
            <div>
                {showStatus && <p style={{ textAlign: "center", fontSize: "1.5rem" }}>Ticket Verified</p>}
            </div>
            <div style={{ flexGrow: 1 }}></div>
        </div>
    );
};

export default NFT;

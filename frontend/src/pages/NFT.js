import React from "react";
import Scanner from "../components/scanner";
import { useState } from "react";
const NFT = () => {
    const [decodedText, setDecodedText] = useState("");
    const [showScanner, setShowScanner] = useState(true);

    const handleDecodedText = (text) => {
        setDecodedText(text);
        console.log("Decoded QR Code Text:", text);
        setShowScanner(false);
    };


    return (
        <div>
            <h1>NFT</h1>
            {showScanner && <Scanner onDecode={handleDecodedText} />}
            <p>Decoded QR Text: {decodedText}</p>
        </div>
    );
};

export default NFT;

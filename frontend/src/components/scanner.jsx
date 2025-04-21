import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Scanner({ onDecode }) {
    useEffect(() => {
        const Scanner = new Html5QrcodeScanner(
            'reader',
            { fps: 10, qrbox: 250 },
            false
        );

        const handleScanSuccess = (decodedText) => {
            if (onDecode) {
                onDecode(decodedText); // Send to parent
                Scanner.clear(); // Stop scanning after successful decode
            }
        };

        Scanner.render(handleScanSuccess);

        return () => {
            Scanner.clear(); // Cleanup on component unmount
        };
    }, [onDecode]);

    return (
        <div className="Scanner">
            <br />
            <div id="reader" style={{ width: '500px', margin: 'auto' }}></div>
            <br />
        </div>
    );
}
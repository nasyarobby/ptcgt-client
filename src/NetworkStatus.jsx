import React, { useState, useEffect } from 'react';
import './App.css'; // Create this CSS file

export default function NetworkWatcher({ socketState, children, sendCmd }) {
    const [networkStatus, setNetworkStatus] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let message = '';
        switch (socketState) {
            case 0:
                message = 'Idle';
                break;
            case 1:
                message = 'Connected';
                break;
            case 3:
                message = 'Connection Failed';
                break;
            default:
                message = null;
        }

        if (message) {
            setNetworkStatus(message);
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000); // Hide after 3 seconds

            return () => clearTimeout(timer); // Cleanup timer if component unmounts or socketState changes
        } else {
            setIsVisible(false);
        }

        if(socketState === 1) {
            alert("connected")
        }

    }, [socketState]);

    let color = "#777";

    if(socketState === 1) {
        color = "green"
    }
    else if(socketState ===3) {
        color = "red"
    }

    return (
        <div>
            {isVisible && networkStatus && (
                <div className={`network-status ${isVisible ? 'show' : ''}`}>
                    <h2>Network Status: {networkStatus}</h2>
                </div>
            )}
            {children}
            <div style={{position: "fixed", bottom: 10, right: 10, width: 20, height: 20, 
                backgroundColor: color}}></div>
        </div>
    );
}
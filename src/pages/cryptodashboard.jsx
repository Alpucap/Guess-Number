import React, { useState, useEffect } from 'react';

function CryptoPrice() {
    const [cryptoData, setCryptoData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5001');

        ws.onopen = () => {
        console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setCryptoData(data);
        setLoading(false);
        };

        ws.onerror = (error) => {
        console.error('WebSocket Error: ', error);
        };

        return () => {
        ws.close();
        };
    }, []);

    const SkeletonLoader = () => (
        <div className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32 bg-[#d2d0b3] animate-pulse rounded-lg" />
    );

    return (
        <div className="text-center h-screen flex flex-col items-center m-10">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-[#F0EDCC] text-2xl md:text-3xl lg:text-6xl font-light mb-20">
            Cryptocurrency Prices
            </h1>
            {loading ? (
                <div className="flex flex-row gap-4">
                    <SkeletonLoader />
                    <SkeletonLoader />
                    <SkeletonLoader />
                </div>
            ) : (
            <div className="flex flex-row gap-4">
                <h2 className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32 bg-[#F0EDCC] text-[#02343F] rounded-lg font-bold flex items-center justify-center">
                Bitcoin: ${cryptoData.bitcoin?.usd}
                </h2>
                <h2 className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32 bg-[#F0EDCC] text-[#02343F] rounded-lg font-bold flex items-center justify-center">
                Ethereum: ${cryptoData.ethereum?.usd}
                </h2>
                <h2 className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32 bg-[#F0EDCC] text-[#02343F] rounded-lg font-bold flex items-center justify-center">
                Solana: ${cryptoData.solana?.usd}
                </h2>
            </div>
            )}
        </div>
        <footer className="text-[#F0EDCC] font-sans mt-12 text-sm md:text-md lg:text-lg">
            Made by HC SANDBOX
        </footer>
        </div>
    );
}

export default CryptoPrice;

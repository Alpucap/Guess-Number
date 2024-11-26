import React, { useEffect, useState } from "react";
import axios from "axios";

const CryptoDashboard = () => {
    const [text, setText] = useState('Please ask a question...');
    const [cryptoData, setCryptoData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get('/api/crypto')
        .then(response => {
            setCryptoData(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Ada masalah dengan pengambilan data crypto:', error);
            setLoading(false);
        });
    }, []);

    return (
        <div className="text-center h-screen flex flex-col items-center m-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[#F0EDCC] text-2xl md:text-3xl lg:text-6xl font-light mb-20">{text}</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="flex flex-row gap-4">
                        <h2 className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32 bg-[#F0EDCC] text-[#02343F] rounded-lg font-bold flex items-center justify-center">Bitcoin: ${cryptoData.bitcoin?.usd}</h2>
                        <h2 className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32 bg-[#F0EDCC] text-[#02343F] rounded-lg font-bold flex items-center justify-center">Ethereum: ${cryptoData.ethereum?.usd}</h2>
                        <h2 className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32 bg-[#F0EDCC] text-[#02343F] rounded-lg font-bold flex items-center justify-center">Litecoin: ${cryptoData.litecoin?.usd}</h2>
                    </div>
                )}
            </div>
            <footer className="text-[#F0EDCC] font-sans mt-12 text-sm md:text-md lg:text-lg">Made by HC SANDBOX</footer>
        </div>
    );
};

export default CryptoDashboard;

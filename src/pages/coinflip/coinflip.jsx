import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import HeadImg from '../../asset/Head.png';
import TailImg from '../../asset/Tail.png';
import audioMusic from '../../asset/draw.mp3';

const CoinFlip = () => {
    const [text, setText] = useState('Please Flip The Coin');
    const [ptext, setpText] = useState('');
    const [img, setImg] = useState (HeadImg);
    const [isGameInProgress, setIsGameInProgress] = useState(false);

    const Audioref = useRef(new Audio(audioMusic));

    const [ChoosenOne, setChoosenOne] = useState(() => {
        const choices = ['Head', 'Tail'];
        return choices[Math.floor(Math.random() * 2)];
    });

    const handleButton = () => {
        if (isGameInProgress) return;
        setIsGameInProgress(true);

        let choosen = '';
        if (ChoosenOne === 1){
            choosen = 'Head';
            setImg(HeadImg);
        } else {
            choosen = 'Tail';
            setImg(TailImg);
        }

        Audioref.current.play().catch(error => console.log('Failed to play sound:', error));
        setText(`Your coin is ${choosen}`);
        setpText("Loading next game...");

        setTimeout(() => {
            handleRefresh();
            setIsGameInProgress(false);
            setChoosenOne(Math.floor(Math.random() * 2) + 1);
        }, 3000);
    }

    const handleRefresh = () => {
        setText('Please Flip The Coin');
        setpText('');
    };

    return (
        <div className="text-center h-screen flex flex-col items-center m-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[#F0EDCC] text-2xl md:text-3xl lg:text-6xl font-light mb-20">{text}</h1>
                <img src={img} alt="Coin" className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-transparent object-contain" />
                <div className="flex flex-row items-center justify-center gap-5 md:gap-8 lg:gap-16 mt-20">
                    <button onClick={() => handleButton()} className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32 bg-[#F0EDCC] text-[#02343F] rounded-lg font-bold shadow-md active:shadow-sm active:translate-y-1 flex items-center justify-center">
                        Spin The Coin
                    </button>
                </div>
                <p className="text-[#F0EDCC] text-sm md:text-md lg:text-lg font-light mt-6 md:mt-12 lg:mt-16 font-sans">{ptext}</p>
            </div>
            <footer className="text-[#F0EDCC] font-sans mt-12 text-sm md:text-md lg:text-lg">Made by HC SANDBOX</footer>
        </div>
    );
};

export default CoinFlip;
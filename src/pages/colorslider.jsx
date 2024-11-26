import React, { useState, useEffect } from 'react';

const ColorSlider = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [hex, setHex] = useState('');

  const handleSliderChange1 = (event) => {
    setValue1(event.target.value);
  };

  const handleSliderChange2 = (event) => {
    setValue2(event.target.value);
  };

  const handleSliderChange3 = (event) => {
    setValue3(event.target.value);
  };

  const handleInputChange1 = (event) => {
    setValue1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setValue2(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setValue3(event.target.value);
  };

  const rgbToHex = (r, g, b) => {
    return (
      '#' +
      [r, g, b]
        .map((val) => {
          const hex = parseInt(val, 10).toString(16);
          return hex.length === 1 ? '0' + hex : hex; 
        })
        .join('')
    ).toUpperCase();
  };

  useEffect(() => {
    setHex(rgbToHex(value1, value2, value3));
  }, [value1, value2, value3]);

  return (
    <div className="text-center h-screen flex flex-col items-center flex-grow mt-20 mx-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[#F0EDCC] text-2xl md:text-3xl lg:text-6xl font-light mb-20">Color Sliders</h1>
        <div className="flex flex-col md:flex-row lg:flex-row items-center gap-4 md:gap-8 lg:gap-16">
            <div className="flex flex-col items-center gap-4">
              <div 
                className="w-[250px] h-[250px] rounded-md"
                style={{ backgroundColor: `rgb(${value1}, ${value2}, ${value3})` }} 
              ></div>
              <p style={{color: `rgb(${value1}, ${value2}, ${value3})`}}>{hex}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center space-y-2">
                    <label className="text-[#F0EDCC] text-sm md:text-md lg:text-lg font-medium">Red:</label>
                    <div className="flex items-center gap-4">
                        <input
                          type="number"
                          value={value1}
                          min="0"
                          max="255"
                          onChange={handleInputChange1}
                          className="w-20 p-2 text-[#F0EDCC] text-center border rounded"
                        />
                        <input
                          type="range"
                          id="slider1"
                          min="0"
                          max="255"
                          value={value1}
                          onChange={handleSliderChange1}
                          className="slider-red"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <label className="text-[#F0EDCC] text-sm md:text-md lg:text-lg font-medium">Green:</label>
                    <div className="flex items-center gap-4">
                        <input
                          type="number"
                          value={value2}
                          min="0"
                          max="255"
                          onChange={handleInputChange2}
                          className="w-20 p-2 text-[#F0EDCC] text-center border rounded"
                        />
                        <input
                          type="range"
                          id="slider2"
                          min="0"
                          max="255"
                          value={value2}
                          onChange={handleSliderChange2}
                          className="slider-green"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <label className="text-[#F0EDCC] text-sm md:text-md lg:text-lg font-medium">Blue:</label>
                    <div className="flex items-center gap-4">
                        <input
                          type="number"
                          value={value3}
                          min="0"
                          max="255"
                          onChange={handleInputChange3}
                          className="w-20 p-2 text-[#F0EDCC] text-center border rounded"
                        />
                        <input
                          type="range"
                          id="slider3"
                          min="0"
                          max="255"
                          value={value3}
                          onChange={handleSliderChange3}
                          className="slider-blue"
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <footer className="text-[#F0EDCC] font-sans mt-12 text-sm md:text-md lg:text-lg">
        Made by HC SANDBOX
      </footer>
      <style jsx>{`
        .slider-red {
          -webkit-appearance: none;
          width: 200px;
          height: 8px;
          background: linear-gradient(to right, rgba(255, 0, 0, 0.5) 0%, rgba(255, 0, 0, 1) 100%);
          border-radius: 10px;
        }

        .slider-red::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background-color: red;
          border-radius: 50%;
          cursor: pointer;
        }

        .slider-blue {
          -webkit-appearance: none;
          width: 200px;
          height: 8px;
          background: linear-gradient(to right, rgba(0, 0, 255, 0.5) 0%, rgba(0, 0, 255, 1) 100%);
          border-radius: 10px;
        }

        .slider-blue::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background-color: blue;
          border-radius: 50%;
          cursor: pointer;
        }

        .slider-green {
          -webkit-appearance: none;
          width: 200px;
          height: 8px;
          background: linear-gradient(to right, rgba(0, 255, 0, 0.5) 0%, rgba(0, 255, 0, 1) 100%);
          border-radius: 10px;
        }

        .slider-green::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background-color: green;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ColorSlider;

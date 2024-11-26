import React, { useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const QuestionBot = () => {
    const [text, setText] = useState('Please ask a question...');
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    axiosRetry(axios, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay, 
        retryCondition: (error) => error.response?.status === 429, 
    });

    const fetchQuestion = async () => {
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: 'Generate a random deep question.' }],
                max_tokens: 50,
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            });
    
            const generatedQuestion = response.data.choices[0].message.content.trim();
            setQuestion(generatedQuestion);
        } catch (error) {
            setError(error.message);
        }
    };
    

    return (
        <div className="text-center h-screen flex flex-col items-center m-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[#F0EDCC] text-2xl md:text-3xl lg:text-6xl font-light mb-20">{text}</h1>
                <button onClick={fetchQuestion} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Question'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <h2>Generated Question:</h2>
                    <p>{question}</p>
                </div>
            </div>
            <footer className="text-[#F0EDCC] font-sans mt-12 text-sm md:text-md lg:text-lg">Made by HC SANDBOX</footer>
        </div>
    );
};

export default QuestionBot;

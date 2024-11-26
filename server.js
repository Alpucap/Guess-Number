const express = require('express');
const axios = require('axios');
const WebSocket = require('ws');
const app = express();
const port = 5000;

const wss = new WebSocket.Server({ port: 5001 }); 

wss.on('connection', (ws) => {
  console.log('Client connected');

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
      ws.send(JSON.stringify(response.data)); 
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  fetchCryptoData();

  const interval = setInterval(fetchCryptoData, 5000);

  ws.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:${port}`);
});

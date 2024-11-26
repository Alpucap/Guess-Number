import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd'
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi masalah saat mengambil data' });
  }
}

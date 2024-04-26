const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const apiKey = 'YOUR_API_KEY_HERE';
const baseURL = `https://v6.exchangerate-api.com/v6/${apiKey}`;

app.use(express.json());

app.post('/convert', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;

  try {
    const response = await axios.get(`${baseURL}/pair/${fromCurrency}/${toCurrency}`);
    const exchangeRate = response.data.conversion_rate;

    const convertedAmount = amount * exchangeRate;

    res.json({ convertedAmount, exchangeRate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to convert currency' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
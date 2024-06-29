import quotes from './quotes.json';

export default function handler(req, res) {

  const randomIndex = Math.floor(Math.random() * quotes.quotes.length);

  const randomQuote = quotes.quotes[randomIndex];

  res.status(200).json(randomQuote);
}

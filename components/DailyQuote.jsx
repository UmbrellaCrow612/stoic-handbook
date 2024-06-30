import React, { useEffect, useState } from 'react';

const DailyQuote = () => {
  const [quote, setQuote] = useState({ message: '', author: '' });
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      setFetching(true);
      setError(null);
      const response = await fetch('/api/quote');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      setError(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchQuote().then(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error.message}</div>;
  }

  return (
    <div style={styles.quoteContainer}>
      <p style={styles.quoteMessage}>"{quote.message}"</p>
      <p style={styles.quoteAuthor}>- {quote.author}</p>
      <button style={styles.button} onClick={fetchQuote} disabled={fetching}>
        {fetching ? 'Fetching...' : 'Fetch New Quote'}
      </button>
    </div>
  );
};

const styles = {
  loading: {
    fontSize: '20px',
    color: '#888',
    textAlign: 'center',
    marginTop: '20px',
  },
  error: {
    fontSize: '20px',
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  },
  quoteContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '50px auto',
    backgroundColor: '#f9f9f9',
  },
  quoteMessage: {
    fontSize: '24px',
    fontStyle: 'italic',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    alignSelf: 'center'
  }
};

export default DailyQuote;

import React from "react";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });

const DailyQuote = () => {
  const {
    data: quote,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/quote", fetcher);

  if (isLoading) {
    return (
      <div className="text-xl text-gray-600 dark:text-gray-400 text-center mt-5">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-xl text-red-600 dark:text-red-400 text-center mt-5">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md max-w-lg mx-auto mt-12 bg-gray-100 dark:bg-gray-800">
      {quote && (
        <>
          <p className="text-2xl italic text-gray-800 dark:text-gray-200 mb-2 text-center">
            "{quote.message}"
          </p>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-300 text-center">
            - {quote.author}
          </p>
          {quote.context && (
            <p className="text-lg italic text-gray-600 dark:text-gray-400 mt-2 text-center">
              Context: {quote.context}
            </p>
          )}
        </>
      )}
      <button
        className={`mt-5 px-4 py-2 text-lg text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 rounded shadow ${
          isLoading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => mutate()}
        disabled={isLoading}
      >
        {isLoading ? "Fetching..." : "Fetch New Quote"}
      </button>
    </div>
  );
};

export default DailyQuote;

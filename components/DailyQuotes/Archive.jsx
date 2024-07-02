import useSWR from "swr";
import { useState } from "react";

// Function to fetch data
const fetcher = (url) => fetch(url).then((res) => res.json());

const Archive = () => {
  const { data, error } = useSWR("/api/quote/all", fetcher);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuotes = data?.quotes?.filter(
    (quote) =>
      quote.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quote.context &&
        quote.context.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="py-10 px-4 space-y-5 mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Archive Search</h2>
      <input
        type="text"
        placeholder="Search quotes..."
        className="mb-4 p-2 border rounded w-full  text-gray-800 dark:text-gray-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="h-96 overflow-y-auto rounded-lg shadow-md">
        {error && <p className="text-red-500 p-4">Failed to load quotes</p>}
        {!data && !error && <p className="text-gray-600 dark:text-gray-400 p-4">Loading...</p>}
        <div className="space-y-4 p-4">
          {filteredQuotes?.map((quote, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 p-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{quote.message}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">- {quote.author}</p>
              {quote.context && (
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{quote.context}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archive;
import { useEffect, useState } from "react";
import { EntryItem } from "./EntryItem";

export const Entries = ({ showEntries }) => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedEntries =
      JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(storedEntries);
  }, [showEntries]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEntryDeleted = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  const handleEntryEdited = (editedEntry) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === editedEntry.id ? editedEntry : entry
    );
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  const filteredEntries = entries.filter((entry) =>
    Object.values(entry).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="w-full space-y-7">
      <div className="w-full">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500 dark:text-white">
            {searchTerm
              ? "No matching entries found."
              : "No entries found. Start journaling to see your entries here."}
          </p>
        </div>
      ) : (
        filteredEntries.map((entry) => (
          <EntryItem
            key={entry.id}
            data={entry}
            onEntryDeleted={handleEntryDeleted}
            onEntryEdited={handleEntryEdited}
          />
        ))
      )}
    </div>
  );
};

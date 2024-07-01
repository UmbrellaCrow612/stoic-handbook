import React, { useState, useEffect } from "react";

const DisplayJournalEntries = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bestMatch, setBestMatch] = useState(null);

  useEffect(() => {
    const storedEntries = JSON.parse(
      localStorage.getItem("stoicJournalEntries") || "[]"
    );
    setEntries(storedEntries);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setBestMatch(null);
      return;
    }

    const findBestMatch = () => {
      let bestScore = 0;
      let bestEntry = null;

      entries.forEach((entry) => {
        const entryText = JSON.stringify(entry).toLowerCase();
        const score = entryText.split(searchTerm.toLowerCase()).length - 1;
        if (score > bestScore) {
          bestScore = score;
          bestEntry = entry;
        }
      });

      return bestEntry;
    };

    setBestMatch(findBestMatch());
  }, [searchTerm, entries]);

  const handleDeleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("stoicJournalEntries", JSON.stringify(updatedEntries));
  };

  const renderEntry = (entry, index) => (
    <div key={entry.id} className="mb-8 p-4 border rounded shadow">
      <h3 className="text-xl font-semibold mb-2">
        Entry {index + 1} - {entry.date}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium">Gratitude:</h4>
          <p>{entry.gratitude}</p>
        </div>

        <div>
          <h4 className="font-medium">Morning Reflection:</h4>
          <p>
            <strong>Anticipated Challenges:</strong>{" "}
            {entry.morningReflection.anticipatedChallenges}
          </p>
          <p>
            <strong>Preparation Plan:</strong>{" "}
            {entry.morningReflection.preparationPlan}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Evening Reflection:</h4>
        <p>
          <strong>What Went Well:</strong> {entry.eveningReflection.wentWell}
        </p>
        <p>
          <strong>Could Improve:</strong> {entry.eveningReflection.couldImprove}
        </p>
        <p>
          <strong>Virtues Practiced:</strong>{" "}
          {entry.eveningReflection.virtuesPracticed}
        </p>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Negative Visualization:</h4>
        <p>{entry.negativeVisualization}</p>
      </div>

      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div>
          <h4 className="font-medium">Within Control:</h4>
          <p>{entry.control.withinControl}</p>
        </div>
        <div>
          <h4 className="font-medium">Outside Control:</h4>
          <p>{entry.control.outsideControl}</p>
        </div>
        <div>
          <h4 className="font-medium">Responses:</h4>
          <p>{entry.control.responses}</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Virtue Practice:</h4>
        <p>{entry.virtuePractice.join(", ")}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Quote of the Day:</h4>
        <p>{entry.quoteOfDay}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Personal Thoughts:</h4>
        <p>{entry.personalThoughts}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Action Item:</h4>
        <p>{entry.actionItem}</p>
      </div>

      <div className="mt-4">
        <button
          className="px-3 py-2"
          onClick={() => handleDeleteEntry(entry.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Journal Entries</h2>
      <input
        type="text"
        placeholder="Search entries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      {bestMatch ? (
        renderEntry(bestMatch, entries.indexOf(bestMatch))
      ) : entries.length === 0 ? (
        <p>No journal entries found.</p>
      ) : (
        entries.map((entry, index) => renderEntry(entry, index))
      )}
    </div>
  );
};

export default DisplayJournalEntries;

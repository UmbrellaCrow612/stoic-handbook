import { useState } from "react";
import { Forms } from "./Forms";
import { Entries } from "./Entries";

const MyJournal = () => {
  const [showEntries, setShowEntries] = useState(false);
  return (
    <div className="w-full py-5 px-2 space-y-4" id="topOfJournal">
      <button
        onClick={() => setShowEntries(!showEntries)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Show Entries
      </button>
      {showEntries ? <Entries /> : <Forms />}
    </div>
  );
};

export default MyJournal;

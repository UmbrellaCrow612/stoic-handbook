import React from "react";

export const EntryItem = ({ data }) => {
  const {
    date,
    id,
    morningReflection,
    eveningReflection,
    gratitude,
    improvement,
    perspective,
    mementoMori,
    premeditatioMalorum,
    voluntaryDiscomfort,
    nature,
    emotionalAwareness,
  } = data;

  const renderEntryField = (label, value) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <p className="dark:bg-gray-100 text-black bg-gray-200 p-3 rounded-lg">
        {value || "No entry"}
      </p>
    </div>
  );

  return (
    <div className="shadow-md rounded-lg p-6 mb-6 border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{date}</h2>
        <span className="text-sm text-gray-500 dark:text-gray-200">
          ID: {id}
        </span>
      </div>

      {renderEntryField("Morning Reflection", morningReflection)}
      {renderEntryField("Evening Reflection", eveningReflection)}
      {renderEntryField("Gratitude", gratitude)}
      {renderEntryField("Self-improvement", improvement)}
      {renderEntryField("Perspective", perspective)}
      {renderEntryField("Memento Mori", mementoMori)}
      {renderEntryField("Premeditatio Malorum", premeditatioMalorum)}
      {renderEntryField("Voluntary Discomfort", voluntaryDiscomfort)}
      {renderEntryField("Nature of the Universe", nature)}
      {renderEntryField("Emotional Awareness", emotionalAwareness)}

      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
};

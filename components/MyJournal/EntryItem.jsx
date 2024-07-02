import React, { useRef } from "react";

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

  const deleteDialogRef = useRef(null);

  const renderEntryField = (label, value) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <p className="dark:bg-gray-100 text-black bg-gray-200 p-3 rounded-lg">
        {value || "No entry"}
      </p>
    </div>
  );

  const handleDeleteClick = () => {
    deleteDialogRef.current.showModal();
  };

  const handleConfirmDelete = () => {
    // Add delete logic here
    console.log(`Entry with ID ${id} deleted.`);
    deleteDialogRef.current.close();
  };

  const handleCancelDelete = () => {
    deleteDialogRef.current.close();
  };

  return (
    <div className="shadow-md rounded-lg mb-6 border px-3 py-2">
      <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-4">
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
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>

      <dialog ref={deleteDialogRef} className="rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this entry?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={handleCancelDelete}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </div>
      </dialog>
    </div>
  );
};

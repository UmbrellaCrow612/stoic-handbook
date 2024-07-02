import React, { useRef, useState } from "react";

export const EntryItem = ({ data, onEntryDeleted }) => {
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
  const editDialogRef = useRef(null);

  const [editData, setEditData] = useState({ ...data });

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
    const journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const updatedEntries = journalEntries.filter(entry => entry.id !== id);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    deleteDialogRef.current.close();
    onEntryDeleted(id);  // Notify parent component about deletion
  };

  const handleCancelDelete = () => {
    deleteDialogRef.current.close();
  };

  const handleEditClick = () => {
    editDialogRef.current.showModal();
  };

  const handleSaveEdit = () => {
    const journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const updatedEntries = journalEntries.map(entry =>
      entry.id === id ? editData : entry
    );
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    console.log('Edited data saved:', editData);
    editDialogRef.current.close();
  };

  const handleCancelEdit = () => {
    setEditData({ ...data });
    editDialogRef.current.close();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={handleEditClick}>
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

      <dialog ref={editDialogRef} className="rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Edit Entry</h2>
        {Object.keys(editData).map((key) => (
          key !== 'id' && key !== 'date' && (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor={key}>{key.split(/(?=[A-Z])/).join(' ')}</label>
              <input
                type="text"
                id={key}
                name={key}
                value={editData[key]}
                onChange={handleChange}
                className="dark:bg-gray-100 text-black bg-gray-200 p-3 rounded-lg w-full"
              />
            </div>
          )
        ))}
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        </div>
      </dialog>
    </div>
  );
};

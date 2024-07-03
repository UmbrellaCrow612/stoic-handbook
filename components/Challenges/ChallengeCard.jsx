import React, { useRef } from "react";

export const ChallengeCard = ({ data, updateChallenge, resetChallenge, deleteChallenge }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  function cardClicked() {
    dialogRef.current.showModal();
    closeButtonRef.current.focus();
  }

  function closeDialog() {
    dialogRef.current.close();
  }

  function handleStartChallenge() {
    updateChallenge(data.id, "inProgress");
    closeDialog();
  }

  function handleResetChallenge() {
    resetChallenge(data.id);
    closeDialog();
  }

  function handleMarkDone() {
    updateChallenge(data.id, "done");
    closeDialog();
  }

  function handleDeleteChallenge() {
    deleteChallenge(data.id);
    closeDialog();
  }

  return (
    <>
      <button
        onClick={cardClicked}
        className="px-4 py-2 bg-gray-100 dark:bg-gray-400 rounded-lg shadow-md h-fit"
      >
        {data.title}
      </button>

      <dialog
        ref={dialogRef}
        className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg w-11/12 md:w-1/2"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <h2 id="dialog-title" className="text-2xl font-semibold mb-4">
          {data.title}
        </h2>
        <p id="dialog-description" className="mb-4">
          {data.description}
        </p>
        <div className="flex flex-col gap-3 md:flex-row">
          <button
            onClick={closeDialog}
            ref={closeButtonRef}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Close
          </button>
          {data.progress === "notDone" && (
            <button
              onClick={handleStartChallenge}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Start
            </button>
          )}
          {data.progress === "inProgress" && (
            <button
              onClick={handleMarkDone}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Mark as Done
            </button>
          )}
          {data.progress !== "notDone" && (
            <button
              onClick={handleResetChallenge}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Reset
            </button>
          )}
          <button
            onClick={handleDeleteChallenge}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </dialog>
    </>
  );
};

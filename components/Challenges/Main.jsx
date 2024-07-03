import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChallengeCard } from "./ChallengeCard";

export const Main = () => {
  const dialogRef = useRef(null);

  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
  });
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const savedChallenges = JSON.parse(localStorage.getItem("challenges"));
    if (savedChallenges) {
      setChallenges(savedChallenges);
    }
  }, []);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setNewChallenge((prev) => ({ ...prev, [name]: value }));
  }, []);

  const dialogCreateClicked = useCallback(() => {
    setChallenges((prev) => [
      ...prev,
      { ...newChallenge, progress: "notDone", id: prev.length },
    ]);
    setNewChallenge({ title: "", description: "" });
    dialogRef.current.close();
  }, [newChallenge]);

  const createClicked = useCallback(() => {
    dialogRef.current.showModal();
  }, []);

  const dialogCloseClicked = useCallback(() => {
    dialogRef.current.close();
  }, []);

  const updateChallenge = (id, progress) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, progress } : challenge
      )
    );
  };

  const resetChallenge = (id) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === id ? { ...challenge, progress: "notDone" } : challenge
      )
    );
  };

  const deleteChallenge = (id) => {
    setChallenges((prev) => prev.filter((challenge) => challenge.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("challenges", JSON.stringify(challenges));
  }, [challenges]);

  const renderChallenges = (progressStatus) =>
    challenges
      .filter((challenge) => challenge.progress === progressStatus)
      .map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          data={challenge}
          updateChallenge={updateChallenge}
          resetChallenge={resetChallenge}
          deleteChallenge={deleteChallenge}
        />
      ));

  return (
    <div className="space-y-3 mt-10">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={createClicked}
      >
        Create
      </button>

      <dialog
        ref={dialogRef}
        className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg w-11/12 md:w-1/2"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <h2 id="dialog-title" className="text-2xl font-semibold mb-4">
          Create a Challenge
        </h2>
        <p id="dialog-description" className="mb-4">
          Please fill out the form below to create a new challenge.
        </p>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              maxLength="25"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter a title (max 25 characters)"
              value={newChallenge.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              maxLength="100"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter a description (max 100 characters)"
              value={newChallenge.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={dialogCloseClicked}
            >
              Close
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={dialogCreateClicked}
            >
              Create
            </button>
          </div>
        </form>
      </dialog>

      <h2 className="text-2xl">Not Started Challenges</h2>
      <section className="h-96 overflow-y-scroll flex gap-3 p-3 rounded-md shadow-md">
        {renderChallenges("notDone")}
      </section>

      <h2 className="text-2xl">In Progress Challenges</h2>
      <section className="h-96 overflow-y-scroll flex gap-3 p-3 rounded-md shadow-md">
        {renderChallenges("inProgress")}
      </section>

      <h2 className="text-2xl">Completed Challenges</h2>
      <section className="h-96 overflow-y-scroll flex gap-3 p-3 rounded-md shadow-md">
        {renderChallenges("done")}
      </section>
    </div>
  );
};

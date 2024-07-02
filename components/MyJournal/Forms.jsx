import { useState } from "react";

export const Forms = () => {
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36);
  };

  const initialFormData = {
    id: generateId(),
    date: new Date().toISOString().split("T")[0],
    gratitude: "",
    morningReflection: "",
    eveningReflection: "",
    improvement: "",
    perspective: "",
    mementoMori: "",
    premeditatioMalorum: "",
    voluntaryDiscomfort: "",
    nature: "",
    emotionalAwareness: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData(initialFormData);

    const topElement = document.getElementById("topOfJournal");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }

    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };

  const renderTextArea = (id, label, description, required = false) => (
    <div>
      <label htmlFor={id} className="block mb-1 font-bold">
        {label}:
      </label>
      <p id={`${id}-description`} className="text-sm mb-2">
        {description}
      </p>
      <textarea
        id={id}
        name={id}
        value={formData[id]}
        onChange={handleChange}
        rows="3"
        className="w-full p-2 border rounded"
        aria-describedby={`${id}-description`}
        required={required}
      ></textarea>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 space-y-4">
      <div>
        <label htmlFor="date" className="block mb-1 font-bold">
          Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      {renderTextArea(
        "morningReflection",
        "Morning Reflection",
        "What virtues do I want to embody today? What challenges might I face, and how can I prepare for them?",
        true
      )}

      {renderTextArea(
        "eveningReflection",
        "Evening Review",
        "What went well today? What didn't? How did I respond to challenges? Did I act in accordance with my values?",
        true
      )}

      {renderTextArea(
        "gratitude",
        "Gratitude",
        "What am I grateful for today?"
      )}

      {renderTextArea(
        "improvement",
        "Self-improvement",
        "What did I learn today? How can I improve tomorrow?"
      )}

      {renderTextArea(
        "perspective",
        "Perspective",
        "What's within my control and what isn't? Am I giving undue importance to external events?"
      )}

      {renderTextArea(
        "mementoMori",
        "Memento Mori",
        "How am I using my limited time on Earth?"
      )}

      {renderTextArea(
        "premeditatioMalorum",
        "Premeditatio Malorum",
        "What's the worst that could happen, and how would I handle it?"
      )}

      {renderTextArea(
        "voluntaryDiscomfort",
        "Voluntary Discomfort",
        "Did I practice any voluntary discomfort today? What did I learn?"
      )}

      {renderTextArea(
        "nature",
        "Nature of the Universe",
        "How am I aligning myself with the natural order of things?"
      )}

      {renderTextArea(
        "emotionalAwareness",
        "Emotional Awareness",
        "What emotions did I experience today? Were my reactions appropriate and in line with reason?"
      )}

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

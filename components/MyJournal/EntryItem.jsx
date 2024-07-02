export const EntryItem = ({ data }) => {
  const renderEntryField = (label, value) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <p className="dark:bg-gray-100 text-black bg-gray-200 p-3 rounded-lg">
        {value || "No entry"}
      </p>
    </div>
  );

  return (
    <>
      {" "}
      <div className="shadow-md rounded-lg p-6 mb-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{data.date}</h2>
          <span className="text-sm text-gray-500 dark:text-gray-200">
            ID: {data.id}
          </span>
        </div>

        {renderEntryField("Morning Reflection", data.morningReflection)}
        {renderEntryField("Evening Reflection", data.eveningReflection)}
        {renderEntryField("Gratitude", data.gratitude)}
        {renderEntryField("Self-improvement", data.improvement)}
        {renderEntryField("Perspective", data.perspective)}
        {renderEntryField("Memento Mori", data.mementoMori)}
        {renderEntryField("Premeditatio Malorum", data.premeditatioMalorum)}
        {renderEntryField("Voluntary Discomfort", data.voluntaryDiscomfort)}
        {renderEntryField("Nature of the Universe", data.nature)}
        {renderEntryField("Emotional Awareness", data.emotionalAwareness)}
      </div>
    </>
  );
};

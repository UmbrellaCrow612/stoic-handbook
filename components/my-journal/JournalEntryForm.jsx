import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const JournalEntryForm = () => {
  const [entry, setEntry] = useState({
    id: uuidv4(),
    date: new Date().toISOString().split('T')[0],
    gratitude: '',
    morningReflection: { anticipatedChallenges: '', preparationPlan: '' },
    eveningReflection: { wentWell: '', couldImprove: '', virtuesPracticed: '' },
    negativeVisualization: '',
    control: { withinControl: '', outsideControl: '', responses: '' },
    virtuePractice: [],
    quoteOfDay: '',
    personalThoughts: '',
    actionItem: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setEntry(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [name]: value }
    }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [`${parent}.${name}`]: '' }));
  };

  const handleVirtuePractice = (e) => {
    const { value, checked } = e.target;
    setEntry(prev => ({
      ...prev,
      virtuePractice: checked
        ? [...prev.virtuePractice, value]
        : prev.virtuePractice.filter(v => v !== value)
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!entry.date) newErrors.date = 'Date is required';
    if (!entry.gratitude) newErrors.gratitude = 'Gratitude is required';
    if (!entry.morningReflection.anticipatedChallenges) newErrors['morningReflection.anticipatedChallenges'] = 'Anticipated challenges are required';
    if (!entry.eveningReflection.wentWell) newErrors['eveningReflection.wentWell'] = 'What went well is required';
    if (entry.virtuePractice.length === 0) newErrors.virtuePractice = 'Please select at least one virtue';
    if (!entry.actionItem) newErrors.actionItem = 'Action item is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      const entries = JSON.parse(localStorage.getItem('stoicJournalEntries') || '[]');
      entries.push(entry);
      localStorage.setItem('stoicJournalEntries', JSON.stringify(entries));
      alert('Entry saved!');
      handleClear();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleClear = () => {
    setEntry({
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      gratitude: '',
      morningReflection: { anticipatedChallenges: '', preparationPlan: '' },
      eveningReflection: { wentWell: '', couldImprove: '', virtuesPracticed: '' },
      negativeVisualization: '',
      control: { withinControl: '', outsideControl: '', responses: '' },
      virtuePractice: [],
      quoteOfDay: '',
      personalThoughts: '',
      actionItem: ''
    });
    setErrors({});
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSave} className="space-y-4">
        {/* Date field */}
        <div>
          <label htmlFor="date" className="block mb-1">Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            id="date"
            name="date"
            value={entry.date}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : ''}`}
            required
            aria-required="true"
            aria-invalid={errors.date ? 'true' : 'false'}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1" role="alert">{errors.date}</p>}
        </div>

        {/* Gratitude field */}
        <div>
          <label htmlFor="gratitude" className="block mb-1">Gratitude <span className="text-red-500">*</span></label>
          <textarea
            id="gratitude"
            name="gratitude"
            value={entry.gratitude}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.gratitude ? 'border-red-500' : ''}`}
            rows="3"
            required
            aria-required="true"
            aria-invalid={errors.gratitude ? 'true' : 'false'}
          ></textarea>
          {errors.gratitude && <p className="text-red-500 text-sm mt-1" role="alert">{errors.gratitude}</p>}
        </div>

        {/* Morning Reflection */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="anticipatedChallenges" className="block mb-1">Morning Reflection: Anticipated Challenges <span className="text-red-500">*</span></label>
            <textarea
              id="anticipatedChallenges"
              name="anticipatedChallenges"
              value={entry.morningReflection.anticipatedChallenges}
              onChange={(e) => handleNestedChange(e, 'morningReflection')}
              className={`w-full p-2 border rounded ${errors['morningReflection.anticipatedChallenges'] ? 'border-red-500' : ''}`}
              rows="3"
              required
              aria-required="true"
              aria-invalid={errors['morningReflection.anticipatedChallenges'] ? 'true' : 'false'}
            ></textarea>
            {errors['morningReflection.anticipatedChallenges'] && <p className="text-red-500 text-sm mt-1" role="alert">{errors['morningReflection.anticipatedChallenges']}</p>}
          </div>
          <div>
            <label htmlFor="preparationPlan" className="block mb-1">Morning Reflection: Preparation Plan</label>
            <textarea
              id="preparationPlan"
              name="preparationPlan"
              value={entry.morningReflection.preparationPlan}
              onChange={(e) => handleNestedChange(e, 'morningReflection')}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Evening Reflection */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="wentWell" className="block mb-1">Evening Reflection: What Went Well <span className="text-red-500">*</span></label>
            <textarea
              id="wentWell"
              name="wentWell"
              value={entry.eveningReflection.wentWell}
              onChange={(e) => handleNestedChange(e, 'eveningReflection')}
              className={`w-full p-2 border rounded ${errors['eveningReflection.wentWell'] ? 'border-red-500' : ''}`}
              rows="3"
              required
              aria-required="true"
              aria-invalid={errors['eveningReflection.wentWell'] ? 'true' : 'false'}
            ></textarea>
            {errors['eveningReflection.wentWell'] && <p className="text-red-500 text-sm mt-1" role="alert">{errors['eveningReflection.wentWell']}</p>}
          </div>
          <div>
            <label htmlFor="couldImprove" className="block mb-1">Evening Reflection: Could Improve</label>
            <textarea
              id="couldImprove"
              name="couldImprove"
              value={entry.eveningReflection.couldImprove}
              onChange={(e) => handleNestedChange(e, 'eveningReflection')}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label htmlFor="virtuesPracticed" className="block mb-1">Evening Reflection: Virtues Practiced</label>
            <textarea
              id="virtuesPracticed"
              name="virtuesPracticed"
              value={entry.eveningReflection.virtuesPracticed}
              onChange={(e) => handleNestedChange(e, 'eveningReflection')}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Negative Visualization */}
        <div>
          <label htmlFor="negativeVisualization" className="block mb-1">Negative Visualization</label>
          <textarea
            id="negativeVisualization"
            name="negativeVisualization"
            value={entry.negativeVisualization}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>

        {/* Control */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="withinControl" className="block mb-1">Control: Within Control</label>
            <textarea
              id="withinControl"
              name="withinControl"
              value={entry.control.withinControl}
              onChange={(e) => handleNestedChange(e, 'control')}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label htmlFor="outsideControl" className="block mb-1">Control: Outside Control</label>
            <textarea
              id="outsideControl"
              name="outsideControl"
              value={entry.control.outsideControl}
              onChange={(e) => handleNestedChange(e, 'control')}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label htmlFor="responses" className="block mb-1">Control: Responses</label>
            <textarea
              id="responses"
              name="responses"
              value={entry.control.responses}
              onChange={(e) => handleNestedChange(e, 'control')}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Virtue Practice */}
        <div>
          <fieldset>
            <legend className="block mb-1">Virtue Practice <span className="text-red-500">*</span></legend>
            <div className="flex flex-wrap gap-4">
              {['Wisdom', 'Justice', 'Courage', 'Self-Control'].map(virtue => (
                <label key={virtue} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={virtue}
                    checked={entry.virtuePractice.includes(virtue)}
                    onChange={handleVirtuePractice}
                    className="form-checkbox h-5 w-5 text-blue-600"
                    aria-invalid={errors.virtuePractice ? 'true' : 'false'}
                  />
                  <span className="ml-2">{virtue}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {errors.virtuePractice && <p className="text-red-500 text-sm mt-1" role="alert">{errors.virtuePractice}</p>}
        </div>

        {/* Quote of the Day */}
        <div>
          <label htmlFor="quoteOfDay" className="block mb-1">Quote of the Day</label>
          <input
            type="text"
            id="quoteOfDay"
            name="quoteOfDay"
            value={entry.quoteOfDay}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Personal Thoughts */}
        <div>
          <label htmlFor="personalThoughts" className="block mb-1">Personal Thoughts</label>
          <textarea
            id="personalThoughts"
            name="personalThoughts"
            value={entry.personalThoughts}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>

        {/* Action Item */}
        <div>
          <label htmlFor="actionItem" className="block mb-1">Action Item <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="actionItem"
            name="actionItem"
            value={entry.actionItem}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.actionItem ? 'border-red-500' : ''}`}
            required
            aria-required="true"
            aria-invalid={errors.actionItem ? 'true' : 'false'}
          />
          {errors.actionItem && <p className="text-red-500 text-sm mt-1" role="alert">{errors.actionItem}</p>}
        </div>

        {/* Submit and Clear buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-black"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalEntryForm;
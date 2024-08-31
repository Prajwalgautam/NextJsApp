"use client"; // Add this line at the top

import React, { useState } from 'react';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const addTask = () => {
    if (input) {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">To-Do List</h1>
      <div className="flex mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border text-black border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a task"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
      <ul className="list-disc space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center p-2 text-black bg-gray-100 rounded">
            <span>{task}</span>
            <button
              onClick={() => removeTask(index)}
              className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Task = {
  id: number;
  task: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      setLoading(false);
    };
  
    const addTask = async () => {
      if (input) {
        const response = await axios.post('/api/tasks', { task: input });
        setTasks([...tasks, response.data]);
        setInput('');
      }
    };
  
    const updateTask = async (id: number, updatedTask: Partial<Task>) => {
      await axios.put('/api/tasks', { id, ...updatedTask });
      setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
    };
  
    const deleteTask = async (id: number) => {
      await axios.delete('/api/tasks', { data: { id } });
      setTasks(tasks.filter((task) => task.id !== id));
    };
  
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">To-Do List</h1>
        <div className="flex mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a task"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
        {loading ? (
          <div className="text-center">Loading tasks...</div>
        ) : (
          <ul className="list-disc space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex justify-between items-center p-2 bg-gray-100 rounded transition-all ${task.completed ? 'line-through bg-gray-300' : ''
                  }`}
              >
                <span>{task.task}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => updateTask(task.id, { completed: !task.completed })}
                    className={`p-1 rounded ${task.completed ? 'bg-yellow-500' : 'bg-green-600'} text-white hover:opacity-80`}
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  

export default TodoList;

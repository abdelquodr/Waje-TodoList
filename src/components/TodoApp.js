import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import './TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTodos(data.slice(0, 10)); // getting 10 todos for simplicity
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), title: text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // handle all possible cases
  });

  return (
    <>
      <Navbar />
      <div className="todo-app">
        <h1>Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoFilter filter={filter} setFilter={setFilter} />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <TodoList todos={filteredTodos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        )}
      </div>
    </>
    
  );
};

export default TodoApp;
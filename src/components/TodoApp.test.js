import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import TodoApp from './TodoApp';


test('renders TodoApp component', async () => {
  render(
      <Router>
        <AuthProvider>
          <TodoApp />
        </AuthProvider>
      </Router>
  );

  expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
});

it('should render the initial UI correctly with Navbar, TodoForm, TodoFilter, and TodoList', () => {
  const authValue = { auth: 'fake-token' };

  render(
    <Router>
       <AuthContext.Provider value={authValue}>
        <TodoApp />
      </AuthContext.Provider>
    </Router>
   
  );

  expect(screen.getByText('Todo List')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
  expect(screen.getByText('All')).toBeInTheDocument();
  expect(screen.getByText('Active')).toBeInTheDocument();
  expect(screen.getByText('Completed')).toBeInTheDocument();
});


it('should handle empty todo list gracefully', () => {
  const authValue = { auth: 'fake-token' };

  render(
    <Router>
       <AuthContext.Provider value={authValue}>
        <TodoApp />
      </AuthContext.Provider>
    </Router>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('should fetch and display a list of todos from the API', async () => {
  const authValue = { auth: 'fake-token' };

  const mockTodos = [
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: true },
  ];
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
  );
  render(<Router>
    <AuthContext.Provider value={authValue}>
     <TodoApp />
   </AuthContext.Provider>
 </Router>);
  expect(await screen.findByText('Test Todo 1')).toBeInTheDocument();
  expect(await screen.findByText('Test Todo 2')).toBeInTheDocument();
});


it('should handle API fetch failure and display an appropriate error message', async () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Network response was not ok'))
  );

  const authValue = { auth: 'fake-token' };

  render(<Router>
    <AuthContext.Provider value={authValue}>
     <TodoApp />
   </AuthContext.Provider>
 </Router>)

  expect(await screen.findByText('Error: Network response was not ok')).toBeInTheDocument();
});

it('should filter todos based on the selected filter', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ];

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
  );

  const authValue = { auth: 'fake-token' };

  render(
    <Router>
      <AuthContext.Provider value={authValue}>
        <TodoApp />
      </AuthContext.Provider>
    </Router>
  );

  // Wait for the todos to be fetched and displayed
  await waitFor(() => {
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
  });

  // Click on the "Active" filter button
  const activeButton = screen.getByText('Active');
  fireEvent.click(activeButton);

  // Wait for the filtered todos to be displayed
  await waitFor(() => {
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Todo 2')).not.toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
  });
});

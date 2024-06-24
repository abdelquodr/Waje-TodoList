import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

test('renders todos and handles toggle and remove actions', () => {
  const todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
  ];
  const toggleTodoMock = jest.fn();
  const removeTodoMock = jest.fn();

  const { getByText, getByLabelText } = render(
    <TodoList todos={todos} toggleTodo={toggleTodoMock} removeTodo={removeTodoMock} />
  );

  expect(getByText('Todo 1')).toBeInTheDocument();
  expect(getByText('Todo 2')).toBeInTheDocument();

  fireEvent.click(getByText(/Todo 1/i));
  expect(toggleTodoMock).toHaveBeenCalledWith(1);

});

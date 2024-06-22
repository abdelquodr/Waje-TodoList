import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoForm from '../components/TodoForm';

test('calls addTodo with the correct text on form submission', () => {
  const addTodoMock = jest.fn();
  const { getByPlaceholderText, getByText } = render(<TodoForm addTodo={addTodoMock} />);

  const input = getByPlaceholderText(/add a new todo/i);
  const button = getByText(/add/i);

  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(button);

  expect(addTodoMock).toHaveBeenCalledWith('New Todo');
  expect(input.value).toBe('');
});

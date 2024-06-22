// src/components/TodoFilter.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoFilter from './TodoFilter';

test('calls setFilter with the correct filter', () => {
  const setFilterMock = jest.fn();
  const { getByText } = render(<TodoFilter filter="all" setFilter={setFilterMock} />);

  fireEvent.click(getByText(/active/i));
  expect(setFilterMock).toHaveBeenCalledWith('active');

  fireEvent.click(getByText(/completed/i));
  expect(setFilterMock).toHaveBeenCalledWith('completed');

  fireEvent.click(getByText(/all/i));
  expect(setFilterMock).toHaveBeenCalledWith('all');
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders an image', () => {
  render(<App />);
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
});

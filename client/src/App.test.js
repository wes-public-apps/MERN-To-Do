import { render, screen } from '@testing-library/react';
import App from './App';

test('App Title Appears',()=>{
  render(<App />);
  const titleContainer = screen.getByText(/MERN-Stack Todo App/i);
  expect(titleContainer).toBeInTheDocument();
});
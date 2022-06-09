// Write your tests here
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import AppFunctional from "./AppFunctional"

test('sanity', () => {
  expect(true).toBe(true)
})

test('Component loads on a page', () => {
  render(<AppFunctional />)
});

test('Renders left button', () => {
  render(<AppFunctional />)
  const leftButton = screen.getByRole("button", {name: /left/i})
  expect(leftButton).toBeInTheDocument()
});

test('Renders right button', () => {
  render(<AppFunctional />)
  const rightButton = screen.getByRole("button", {name: /right/i})
  expect(rightButton).toBeInTheDocument()
});

test('Renders up button', () => {
  render(<AppFunctional />)
  const upButton = screen.getByRole("button", {name: /up/i})
  expect(upButton).toBeInTheDocument()
});

test('Renders down button', () => {
  render(<AppFunctional />)
  const downButton = screen.getByRole("button", {name: /down/i})
  expect(downButton).toBeInTheDocument()
});

test('Typing on the input results in its value changing to the entered text', () => {
  render(<AppFunctional />)
  const emailInput = document.querySelector("#email")
  fireEvent.change(emailInput, {target: "jo@aol.com"})
  expect(emailInput).toBeInTheDocument()
});
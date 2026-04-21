// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { describe, expect, it } from 'vitest';
import rootReducer from '../store';
import CalculatorComponent from './Calculator.component';

describe('Calculator root wiring', () => {
  it('wires keyboard, display and about through redux containers', () => {
    const store = createStore(rootReducer);
    const { container } = render(
      <Provider store={store}>
        <CalculatorComponent />
      </Provider>
    );

    const keyTwo = screen.getByRole('button', { name: '2' });
    const keyEnter = screen.getByRole('button', { name: 'Enter' });
    const keyThree = screen.getByRole('button', { name: '3' });
    const keyPlus = screen.getByRole('button', { name: 'Add' });

    fireEvent.click(keyTwo);
    fireEvent.click(keyEnter);
    fireEvent.click(keyThree);
    fireEvent.click(keyPlus);

    const lines = container.querySelectorAll('.DisplayLine');
    expect(lines[lines.length - 1].textContent).toBe('5');

    expect(screen.getByRole('main', { name: 'React Calculator' })).toBeTruthy();

    const aboutButton = screen.getByRole('button', {
      name: 'About React Calculator'
    });
    fireEvent.click(aboutButton);
    expect(container.querySelector('.AboutBoxComponent')).toBeTruthy();
  });

  it('supports direct physical keyboard input', () => {
    const store = createStore(rootReducer);
    const { container } = render(
      <Provider store={store}>
        <CalculatorComponent />
      </Provider>
    );

    fireEvent.keyDown(window, { key: '2' });
    fireEvent.keyDown(window, { key: 'Enter' });
    fireEvent.keyDown(window, { key: '3' });
    fireEvent.keyDown(window, { key: '+' });

    const lines = container.querySelectorAll('.DisplayLine');
    expect(lines[lines.length - 1].textContent).toBe('5');
  });
});

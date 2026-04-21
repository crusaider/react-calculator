// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
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

    const keyTwo = Array.from(container.querySelectorAll('.Key')).find(
      (el) => el.textContent?.trim() === '2'
    );
    const keyEnter = Array.from(container.querySelectorAll('.Key')).find(
      (el) => el.textContent?.trim() === 'enter'
    );
    const keyThree = Array.from(container.querySelectorAll('.Key')).find(
      (el) => el.textContent?.trim() === '3'
    );
    const keyPlus = container.querySelector('.Key.PlusKey');

    expect(keyTwo).toBeTruthy();
    expect(keyEnter).toBeTruthy();
    expect(keyThree).toBeTruthy();
    expect(keyPlus).toBeTruthy();

    fireEvent.click(keyTwo as Element);
    fireEvent.click(keyEnter as Element);
    fireEvent.click(keyThree as Element);
    fireEvent.click(keyPlus as Element);

    const lines = container.querySelectorAll('.DisplayLine');
    expect(lines[lines.length - 1].textContent).toBe('5');

    const aboutButton = container.querySelector('.AboutComponent button');
    expect(aboutButton).toBeTruthy();
    fireEvent.click(aboutButton as Element);
    expect(container.querySelector('.AboutBoxComponent')).toBeTruthy();
  });
});

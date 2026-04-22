import React from 'react';
import { useDispatch } from 'react-redux';
import DisplayContainerComponent from './Display/DisplayContainer.component';
import KeyboardContainerComponent from './Keyboard/KeyboardContainer.component';
import './Calculator.component.css';
import { AboutContainerComponent } from './About/AboutContainer.component';
import { keyClicked, KeyCode } from '../store/stack/actions';

const CalculatorComponent: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const keyMap: Record<string, KeyCode> = {
      '0': KeyCode.Zero,
      '1': KeyCode.One,
      '2': KeyCode.Two,
      '3': KeyCode.Three,
      '4': KeyCode.Four,
      '5': KeyCode.Five,
      '6': KeyCode.Six,
      '7': KeyCode.Seven,
      '8': KeyCode.Eight,
      '9': KeyCode.Nine,
      '.': KeyCode.Comma,
      ',': KeyCode.Comma,
      '/': KeyCode.Divide,
      '*': KeyCode.Multiply,
      x: KeyCode.Multiply,
      X: KeyCode.Multiply,
      '-': KeyCode.Subtract,
      '+': KeyCode.Add,
      Enter: KeyCode.Enter,
      '=': KeyCode.Enter,
      Backspace: KeyCode.Drop,
      Delete: KeyCode.Drop
    };

    const codeMap: Record<string, KeyCode> = {
      Numpad0: KeyCode.Zero,
      Numpad1: KeyCode.One,
      Numpad2: KeyCode.Two,
      Numpad3: KeyCode.Three,
      Numpad4: KeyCode.Four,
      Numpad5: KeyCode.Five,
      Numpad6: KeyCode.Six,
      Numpad7: KeyCode.Seven,
      Numpad8: KeyCode.Eight,
      Numpad9: KeyCode.Nine,
      NumpadDecimal: KeyCode.Comma,
      NumpadDivide: KeyCode.Divide,
      NumpadMultiply: KeyCode.Multiply,
      NumpadSubtract: KeyCode.Subtract,
      NumpadAdd: KeyCode.Add,
      NumpadEnter: KeyCode.Enter,
      Backspace: KeyCode.Drop,
      Delete: KeyCode.Drop
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const target = event.target;
      if (target instanceof HTMLElement) {
        if (target.closest('a, dialog, input, textarea, select, [contenteditable="true"]')) {
          return;
        }

        const focusedButton = target.closest('button');
        if (focusedButton?.classList.contains('Key')) {
          if (event.key === 'Enter' || event.key === ' ') {
            return;
          }
        } else if (focusedButton) {
          return;
        }
      }

      const mappedKey =
        (event.code === 'Equal' && event.shiftKey
          ? KeyCode.Add
          : undefined) ?? codeMap[event.code] ?? keyMap[event.key];
      if (mappedKey === undefined) {
        return;
      }

      event.preventDefault();
      dispatch(keyClicked(mappedKey));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  return (
    <main aria-label="React Calculator" className="CalculatorComponent">
      <h1>React Calculator</h1>
      <div>
        <div className="CalcBody">
          <div className="header">
            <img alt="HP Logo" src="hewlett-packard.svg" />
            <div>
              <span>57KX</span>
              <span>SCIENTIFIC EXTREME</span>
            </div>
          </div>
          <DisplayContainerComponent />
          <KeyboardContainerComponent />
        </div>
        <AboutContainerComponent />
      </div>
    </main>
  );
};

export default CalculatorComponent;

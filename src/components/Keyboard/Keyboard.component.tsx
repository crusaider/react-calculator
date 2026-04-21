import React from 'react';
import './Keyboard.component.css';
import { KeyComponent } from './Key.component';
import { KeyCode } from '../../store/stack/actions';

const keys: {
  classes?: string;
  label: string;
  ariaLabel?: string;
  code: KeyCode;
}[] = [
    {
      classes: 'EnterKey TextKey',
      label: 'enter',
      ariaLabel: 'Enter',
      code: KeyCode.Enter
    },
    {
      classes: 'TextKey',
      label: '+/-',
      ariaLabel: 'Change sign',
      code: KeyCode.SwitchSign
    },
    {
      classes: 'TextKey',
      label: 'drop',
      ariaLabel: 'Drop',
      code: KeyCode.Drop
    },
    {
      label: '7',
      code: KeyCode.Seven
    },
    {
      label: '8',
      code: KeyCode.Eight
    },
    {
      label: '9',
      code: KeyCode.Nine
    },
    {
      label: '/',
      ariaLabel: 'Divide',
      code: KeyCode.Divide
    },
    {
      label: '4',
      code: KeyCode.Four
    },
    {
      label: '5',
      code: KeyCode.Five
    },
    {
      label: '6',
      code: KeyCode.Six
    },
    {
      label: 'x',
      ariaLabel: 'Multiply',
      code: KeyCode.Multiply
    },
    {
      label: '1',
      code: KeyCode.One
    },
    {
      label: '2',
      code: KeyCode.Two
    },
    {
      label: '3',
      code: KeyCode.Three
    },
    {
      label: '-',
      ariaLabel: 'Subtract',
      code: KeyCode.Subtract
    },
    {
      classes: 'ZeroKey',
      label: '0',
      code: KeyCode.Zero
    },
    {
      label: '.',
      ariaLabel: 'Decimal point',
      code: KeyCode.Comma
    },
    {
      classes: 'PlusKey',
      label: '+',
      ariaLabel: 'Add',
      code: KeyCode.Add
    }
  ];

export interface KeyboardComponentProps {
  onKeyClick: (key: KeyCode) => void;
}

export const KeyboardComponent: React.FC<KeyboardComponentProps> = (
  props: KeyboardComponentProps
) => {
  return (
    <fieldset
      aria-label="Calculator keypad"
      className="Keyboard"
    >
      {keys.map((key) => (
        <KeyComponent
          ariaLabel={key.ariaLabel}
          classes={key.classes}
          key={key.code}
          label={key.label}
          onClick={_e => props.onKeyClick(key.code)}
        />
      ))}
    </fieldset>
  );
};

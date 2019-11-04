import React from 'react';
import './Keyboard.component.css';
import { KeyComponent } from './Key.component';
import { KeyCode } from '../../store/stack/actions';

const keys: {
  classes?: string;
  label: string;
  code: KeyCode;
}[] = [
  {
    classes: 'EnterKey TextKey',
    label: 'enter',
    code: KeyCode.Enter
  },
  {
    classes: 'TextKey',
    label: '+/-',
    code: KeyCode.SwitchSign
  },
  {
    classes: 'TextKey',
    label: 'drop',
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
    code: KeyCode.Subtract
  },
  {
    classes: 'ZeroKey',
    label: '0',
    code: KeyCode.Zero
  },
  {
    label: '.',
    code: KeyCode.Comma
  },
  {
    classes: 'PlusKey',
    label: '+',
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
    <div className="Keyboard">
      {keys.map((key, index) => (
        <KeyComponent
          key={index}
          classes={key.classes}
          label={key.label}
          onClick={e => props.onKeyClick(key.code)}
        />
      ))}
    </div>
  );
};

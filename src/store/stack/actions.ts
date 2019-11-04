export enum KeyCode {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Comma = 10,
  SwitchSign,
  Enter,
  Divide,
  Multiply,
  Subtract,
  Add,
  Drop
}

export const KEY_CLICKED = 'KEY_CLICKED';

interface KeyClickedAction {
  type: typeof KEY_CLICKED;
  payload: KeyCode;
}

export type StackActionTypes = KeyClickedAction;

export function keyClicked(key: KeyCode): StackActionTypes {
  return {
    type: KEY_CLICKED,
    payload: key
  };
}

import { StackState } from './state';
import { StackActionTypes, KEY_CLICKED, KeyCode } from './actions';

const initialState: StackState = {
  elements: ['0'],
  untouched: true
};

export function stackReducer(
  state = initialState,
  action: StackActionTypes
): StackState {
  switch (action.type) {
    case KEY_CLICKED:
      if (action.payload <= KeyCode.Nine) {
        return numberCode(state, action.payload);
      }
      if (action.payload === KeyCode.Comma) {
        return decimalPoint(state);
      }
      return operatorCode(state, action.payload);
    default:
      return state;
  }
}

function numberCode(state: StackState, code: KeyCode): StackState {
  const elements: string[] = Object.assign([], state.elements);
  if (state.untouched) {
    elements[elements.length - 1] = code.toString();
  } else {
    elements[elements.length - 1] += code.toString();
  }
  return { untouched: false, elements: elements };
}

function decimalPoint(state: StackState): StackState {
  let elements: string[] = Object.assign([], state.elements);
  let line = elements.pop();

  if (state.untouched) {
    elements.push('0.');
    return { untouched: false, elements };
  }
  if (String(line).includes('.')) {
    elements.push(String(line));
    return { untouched: false, elements };
  } else {
    elements.push(line + '.');
    return { untouched: false, elements };
  }
}

function operatorCode(state: StackState, code: KeyCode): StackState {
  let elements: string[] = Object.assign([], state.elements);
  switch (code) {
    case KeyCode.Drop:
      elements = drop(elements);
      break;
    case KeyCode.Enter:
      elements = enter(elements);
      break;
    case KeyCode.SwitchSign:
      elements = switchSign(elements);
      break;
    case KeyCode.Add:
    case KeyCode.Subtract:
    case KeyCode.Divide:
    case KeyCode.Multiply:
      elements = mathOperator(elements, code);
      break;
  }

  return { untouched: true, elements };
}

function drop(elements: string[]): string[] {
  elements.pop();
  if (elements.length === 0) {
    elements.push('0');
  }
  return elements;
}

function enter(elements: string[]): string[] {
  if (elements[0] && elements[elements.length - 1].length > 0) {
    elements.push(elements[elements.length - 1]);
  }
  return elements;
}

function switchSign(elements: string[]): string[] {
  elements.push(String(Number(elements.pop()) * -1));
  return elements;
}

function mathOperator(elements: string[], code: KeyCode): string[] {
  if (elements.length === 1) {
    return elements;
  }
  const right = Number(elements.pop());
  const left = Number(elements.pop());

  let res: number = 0;
  switch (code) {
    case KeyCode.Add:
      res = left + right;
      break;
    case KeyCode.Subtract:
      res = left - right;
      break;
    case KeyCode.Multiply:
      res = left * right;
      break;
    case KeyCode.Divide:
      res = left / right;
      break;
  }

  elements.push(String(res));
  return elements;
}

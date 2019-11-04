import { StackState } from './state';
import { stackReducer } from './reducer';
import { keyClicked, KeyCode } from './actions';

describe('stack reducer', () => {
  it('should return a state', () => {
    expect(stackReducer(undefined, keyClicked(KeyCode.Comma))).toBeDefined();
  });
  describe('basic math ops', () => {
    let oldState: StackState;
    beforeEach(() => {
      oldState = { elements: ['2', '2'], untouched: false };
    });
    it('should result in 4', () => {
      const state = stackReducer(oldState, keyClicked(KeyCode.Add));
      expect(state.elements.length).toEqual(1);
      expect(state.elements[0]).toEqual('4');
    });
    it('should result in 4', () => {
      const state = stackReducer(oldState, keyClicked(KeyCode.Multiply));
      expect(state.elements.length).toEqual(1);
      expect(state.elements[0]).toEqual('4');
    });
    it('should result in 1', () => {
      const state = stackReducer(oldState, keyClicked(KeyCode.Divide));
      expect(state.elements.length).toEqual(1);
      expect(state.elements[0]).toEqual('1');
    });
    it('should result in 0', () => {
      const state = stackReducer(oldState, keyClicked(KeyCode.Subtract));
      expect(state.elements.length).toEqual(1);
      expect(state.elements[0]).toEqual('0');
    });
  });

  describe('only one argument', () => {
    it('should do nothing', () => {
      const state = stackReducer(
        { elements: ['10'], untouched: false },
        keyClicked(KeyCode.Multiply)
      );
      expect(state.elements.length).toBe(1);
      expect(state.elements[0]).toEqual('10');
    });
  });

  describe('enter', () => {
    it('noting should change', () => {
      const state = stackReducer(
        { elements: [], untouched: false },
        keyClicked(KeyCode.Enter)
      );
      expect(state.elements.length).toEqual(0);
    });
    it('should duplicate', () => {
      const state = stackReducer(
        { elements: ['1'], untouched: false },
        keyClicked(KeyCode.Enter)
      );
      expect(state.elements.length).toEqual(2);
      expect(state.elements[0]).toEqual('1');
      expect(state.elements[1]).toEqual('1');
    });
  });

  describe('decimal point', () => {
    it('should become 0.', () => {
      const state = stackReducer(
        { elements: ['0'], untouched: true },
        keyClicked(KeyCode.Comma)
      );
      expect(state.elements[0]).toEqual('0.');
    });
    it('only one decimal point', () => {
      const state = stackReducer(
        { elements: ['0.1'], untouched: false },
        keyClicked(KeyCode.Comma)
      );
      expect(state.elements[0]).toEqual('0.1');
    });
    it('add trailing decimal point', () => {
      const state = stackReducer(
        { elements: ['233'], untouched: false },
        keyClicked(KeyCode.Comma)
      );
      expect(state.elements[0]).toEqual('233.');
    });
  });

  describe('value', () => {
    it('should create a number', () => {
      const state = stackReducer(
        { elements: ['0'], untouched: true },
        keyClicked(KeyCode.Nine)
      );
      expect(state.elements[0]).toEqual('9');
    });
    it('should add a number', () => {
      const state = stackReducer(
        { elements: ['0'], untouched: false },
        keyClicked(KeyCode.Nine)
      );
      expect(state.elements[0]).toEqual('09');
    });
  });

  describe('drop', () => {
    it('should reset to 0', () => {
      const state = stackReducer(
        { elements: ['0'], untouched: false },
        keyClicked(KeyCode.Drop)
      );
      expect(state.elements[0]).toEqual('0');
    });
  });

  describe('switch sign', () => {
    it('should switch sign', () => {
      const state = stackReducer(
        { elements: ['1'], untouched: false },
        keyClicked(KeyCode.SwitchSign)
      );
      expect(state.elements[0]).toEqual('-1');
    });
  });
});

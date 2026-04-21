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
    it('should result in 4 with Add', () => {
      const state = stackReducer(oldState, keyClicked(KeyCode.Add));
      expect(state.elements.length).toEqual(1);
      expect(state.elements[0]).toEqual('4');
    });
    it('should result in 4 with Multiply', () => {
      const state = stackReducer(oldState, keyClicked(KeyCode.Multiply));
      expect(state.elements.length).toEqual(1);
      expect(state.elements[0]).toEqual('4');
    });
    it('should result in 0 with Subtract', () => {
      oldState.elements = ['2', '2'];
      const state = stackReducer(oldState, keyClicked(KeyCode.Subtract));
      expect(state.elements[0]).toEqual('0');
    });
    it('should result in 1 with Divide', () => {
      oldState.elements = ['2', '2'];
      const state = stackReducer(oldState, keyClicked(KeyCode.Divide));
      expect(state.elements[0]).toEqual('1');
    });
  });

  describe('only one argument', () => {
    it('should do nothing with operator', () => {
      const oldState: StackState = { elements: ['2'], untouched: false };
      const state = stackReducer(oldState, keyClicked(KeyCode.Add));
      expect(state.elements.length).toEqual(1);
      expect(state.elements[0]).toEqual('2');
    });
  });

  describe('enter', () => {
    it('noting should change with single element', () => {
      const oldState: StackState = { elements: ['2'], untouched: false };
      const state = stackReducer(oldState, keyClicked(KeyCode.Enter));
      expect(state.elements.length).toEqual(2);
      expect(state.elements[0]).toEqual('2');
      expect(state.elements[1]).toEqual('2');
    });
    it('should duplicate with multiple elements', () => {
      const oldState: StackState = { elements: ['2', '3'], untouched: false };
      const state = stackReducer(oldState, keyClicked(KeyCode.Enter));
      expect(state.elements.length).toEqual(3);
      expect(state.elements[2]).toEqual('3');
    });
  });

  describe('decimal point', () => {
    it('should become 0. when untouched', () => {
      const oldState: StackState = { elements: ['0'], untouched: true };
      const state = stackReducer(oldState, keyClicked(KeyCode.Comma));
      expect(state.elements[0]).toEqual('0.');
      expect(state.untouched).toEqual(false);
    });
    it('only one decimal point', () => {
      const oldState: StackState = { elements: ['3.5'], untouched: false };
      const state = stackReducer(oldState, keyClicked(KeyCode.Comma));
      expect(state.elements[0]).toEqual('3.5');
    });
    it('add trailing decimal point', () => {
      const oldState: StackState = { elements: ['5'], untouched: false };
      const state = stackReducer(oldState, keyClicked(KeyCode.Comma));
      expect(state.elements[0]).toEqual('5.');
    });
  });

  describe('value', () => {
    it('should create a number when untouched', () => {
      const oldState: StackState = { elements: ['0'], untouched: true };
      const state = stackReducer(oldState, keyClicked(KeyCode.Two));
      expect(state.elements[0]).toEqual('2');
      expect(state.untouched).toEqual(false);
    });
    it('should add a number', () => {
      const oldState: StackState = { elements: ['2'], untouched: false };
      const state = stackReducer(oldState, keyClicked(KeyCode.Three));
      expect(state.elements[0]).toEqual('23');
    });
  });

  describe('drop', () => {
    it('should reset to 0 with single element', () => {
      const oldState: StackState = { elements: ['5'], untouched: false };
      const state = stackReducer(oldState, keyClicked(KeyCode.Drop));
      expect(state.elements[0]).toEqual('0');
    });
    it('should drop last element when multiple', () => {
      const oldState: StackState = { elements: ['2', '3'], untouched: false };
      const state = stackReducer(oldState, keyClicked(KeyCode.Drop));
      expect(state.elements[0]).toEqual('2');
      expect(state.elements.length).toEqual(1);
    });
  });

  describe('switch sign', () => {
    it('should switch sign', () => {
      const oldState: StackState = { elements: ['5'], untouched: false };
      const state = stackReducer(oldState, keyClicked(KeyCode.SwitchSign));
      expect(state.elements[0]).toEqual('-5');
    });
    it('should switch sign from negative', () => {
      const oldState: StackState = { elements: ['-3'], untouched: false };
      const state = stackReducer(oldState, keyClicked(KeyCode.SwitchSign));
      expect(state.elements[0]).toEqual('3');
    });
  });

  describe('unknown action', () => {
    it('should return state unchanged', () => {
      const oldState: StackState = { elements: ['5'], untouched: false };
      const state = stackReducer(oldState, { type: 'UNKNOWN' } as any);
      expect(state).toEqual(oldState);
    });
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import rootReducer, { AppState } from '../store';
import { keyClicked, KeyCode } from '../store/stack/actions';
import { toggleAbout } from '../store/about/actions';

/**
 * Integration smoke tests for calculator workflows
 * Tests reducer-driven app behavior from initial state to final results
 */

describe('Integration: Calculator Workflows', () => {
  let initialState: AppState;

  beforeEach(() => {
    initialState = rootReducer(undefined, { type: '@@INIT' } as any);
  });

  describe('Basic arithmetic operations', () => {
    it('should perform simple addition: 5 + 3 = 8', () => {
      let state = initialState;

      // Enter 5
      state = rootReducer(state, keyClicked(KeyCode.Five));
      expect(state.stack.elements[0]).toBe('5');

      // Press Enter to push to stack
      state = rootReducer(state, keyClicked(KeyCode.Enter));
      expect(state.stack.elements).toContain('5');

      // Enter 3
      state = rootReducer(state, keyClicked(KeyCode.Three));
      expect(state.stack.elements[state.stack.elements.length - 1]).toBe('3');

      // Press + to add
      state = rootReducer(state, keyClicked(KeyCode.Add));
      expect(state.stack.elements[0]).toBe('8');
    });

    it('should perform multiplication: 4 × 7 = 28', () => {
      let state = initialState;

      state = rootReducer(state, keyClicked(KeyCode.Four));
      state = rootReducer(state, keyClicked(KeyCode.Enter));
      state = rootReducer(state, keyClicked(KeyCode.Seven));
      state = rootReducer(state, keyClicked(KeyCode.Multiply));

      expect(state.stack.elements[0]).toBe('28');
    });

    it('should perform subtraction: 10 - 3 = 7', () => {
      let state = initialState;

      state = rootReducer(state, keyClicked(KeyCode.One));
      state = rootReducer(state, keyClicked(KeyCode.Zero));
      state = rootReducer(state, keyClicked(KeyCode.Enter));
      state = rootReducer(state, keyClicked(KeyCode.Three));
      state = rootReducer(state, keyClicked(KeyCode.Subtract));

      expect(state.stack.elements[0]).toBe('7');
    });

    it('should perform division: 20 ÷ 4 = 5', () => {
      let state = initialState;

      state = rootReducer(state, keyClicked(KeyCode.Two));
      state = rootReducer(state, keyClicked(KeyCode.Zero));
      state = rootReducer(state, keyClicked(KeyCode.Enter));
      state = rootReducer(state, keyClicked(KeyCode.Four));
      state = rootReducer(state, keyClicked(KeyCode.Divide));

      expect(state.stack.elements[0]).toBe('5');
    });
  });

  describe('Decimal point operations', () => {
    it('should handle decimal numbers: 2.5 + 1.5 = 4', () => {
      let state = initialState;

      // Enter 2.5
      state = rootReducer(state, keyClicked(KeyCode.Two));
      state = rootReducer(state, keyClicked(KeyCode.Comma));
      state = rootReducer(state, keyClicked(KeyCode.Five));
      state = rootReducer(state, keyClicked(KeyCode.Enter));

      // Enter 1.5
      state = rootReducer(state, keyClicked(KeyCode.One));
      state = rootReducer(state, keyClicked(KeyCode.Comma));
      state = rootReducer(state, keyClicked(KeyCode.Five));

      // Add
      state = rootReducer(state, keyClicked(KeyCode.Add));
      expect(state.stack.elements[0]).toBe('4');
    });
  });

  describe('Stack operations', () => {
    it('should duplicate value with Enter', () => {
      let state = initialState;

      state = rootReducer(state, keyClicked(KeyCode.Seven));
      expect(state.stack.elements.length).toBe(1);

      state = rootReducer(state, keyClicked(KeyCode.Enter));
      expect(state.stack.elements.length).toBe(2);
      expect(state.stack.elements[0]).toBe('7');
      expect(state.stack.elements[1]).toBe('7');
    });

    it('should drop last element', () => {
      let state = initialState;

      state = rootReducer(state, keyClicked(KeyCode.Five));
      state = rootReducer(state, keyClicked(KeyCode.Enter));
      state = rootReducer(state, keyClicked(KeyCode.Three));

      expect(state.stack.elements.length).toBe(2);

      state = rootReducer(state, keyClicked(KeyCode.Drop));
      expect(state.stack.elements.length).toBe(1);
      expect(state.stack.elements[0]).toBe('5');
    });

    it('should reset single element to 0 on drop', () => {
      let state = initialState;

      state = rootReducer(state, keyClicked(KeyCode.Nine));
      expect(state.stack.elements[0]).toBe('9');

      state = rootReducer(state, keyClicked(KeyCode.Drop));
      expect(state.stack.elements[0]).toBe('0');
    });
  });

  describe('Sign switching', () => {
    it('should switch sign from positive to negative', () => {
      let state = initialState;

      state = rootReducer(state, keyClicked(KeyCode.Five));
      expect(state.stack.elements[0]).toBe('5');

      state = rootReducer(state, keyClicked(KeyCode.SwitchSign));
      expect(state.stack.elements[0]).toBe('-5');
    });

    it('should switch sign from negative to positive', () => {
      let state = initialState;

      state = rootReducer(state, keyClicked(KeyCode.Five));
      state = rootReducer(state, keyClicked(KeyCode.SwitchSign));
      expect(state.stack.elements[0]).toBe('-5');

      state = rootReducer(state, keyClicked(KeyCode.SwitchSign));
      expect(state.stack.elements[0]).toBe('5');
    });
  });

  describe('Complex calculation chains', () => {
    it('should calculate: 2 3 + 4 × = 20 (RPN)', () => {
      let state = initialState;

      // 2
      state = rootReducer(state, keyClicked(KeyCode.Two));
      state = rootReducer(state, keyClicked(KeyCode.Enter));

      // 3
      state = rootReducer(state, keyClicked(KeyCode.Three));

      // Add (2 + 3 = 5)
      state = rootReducer(state, keyClicked(KeyCode.Add));
      expect(state.stack.elements[0]).toBe('5');

      // Push result, then enter 4
      state = rootReducer(state, keyClicked(KeyCode.Enter));
      state = rootReducer(state, keyClicked(KeyCode.Four));
      expect(state.stack.elements[state.stack.elements.length - 1]).toBe('4');

      // Multiply (5 × 4 = 20)
      state = rootReducer(state, keyClicked(KeyCode.Multiply));
      expect(state.stack.elements[0]).toBe('20');
    });


    it('should calculate: 10 - (3 + 2) = 5', () => {
      let state = initialState;

      // 10
      state = rootReducer(state, keyClicked(KeyCode.One));
      state = rootReducer(state, keyClicked(KeyCode.Zero));
      state = rootReducer(state, keyClicked(KeyCode.Enter));

      // 3
      state = rootReducer(state, keyClicked(KeyCode.Three));
      state = rootReducer(state, keyClicked(KeyCode.Enter));

      // 2
      state = rootReducer(state, keyClicked(KeyCode.Two));

      // Add (3 + 2 = 5)
      state = rootReducer(state, keyClicked(KeyCode.Add));

      // Subtract (10 - 5 = 5)
      state = rootReducer(state, keyClicked(KeyCode.Subtract));
      expect(state.stack.elements[0]).toBe('5');
    });
  });

  describe('UI Interactions: About modal', () => {
    it('should toggle About modal visibility', () => {
      let state = initialState;

      expect(state.about.show).toBe(false);

      state = rootReducer(state, toggleAbout());
      expect(state.about.show).toBe(true);

      state = rootReducer(state, toggleAbout());
      expect(state.about.show).toBe(false);
    });

    it('should preserve calculator state when toggling About', () => {
      let state = initialState;

      // Do some calculation
      state = rootReducer(state, keyClicked(KeyCode.Five));
      state = rootReducer(state, keyClicked(KeyCode.Enter));
      state = rootReducer(state, keyClicked(KeyCode.Three));
      state = rootReducer(state, keyClicked(KeyCode.Add));

      const calcStateBeforeAbout = state.stack;

      // Toggle About
      state = rootReducer(state, toggleAbout());
      expect(state.about.show).toBe(true);
      expect(state.stack).toEqual(calcStateBeforeAbout);

      // Toggle About back
      state = rootReducer(state, toggleAbout());
      expect(state.about.show).toBe(false);
      expect(state.stack).toEqual(calcStateBeforeAbout);
    });
  });
});

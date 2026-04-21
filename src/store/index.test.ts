import { describe, it, expect } from 'vitest';
import rootReducer from './index';
import { keyClicked, KeyCode } from './stack/actions';
import { toggleAbout } from './about/actions';

describe('root reducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: '@@INIT' } as any);
    expect(state).toBeDefined();
    expect(state.stack).toBeDefined();
    expect(state.about).toBeDefined();
  });

  it('should handle stack actions', () => {
    const state = rootReducer(undefined, keyClicked(KeyCode.Two));
    expect(state.stack.elements[0]).toEqual('2');
  });

  it('should handle about actions', () => {
    const state = rootReducer(undefined, toggleAbout());
    expect(state.about.show).toBe(true);
  });

  it('should handle multiple actions sequentially', () => {
    let state = rootReducer(undefined, { type: '@@INIT' } as any);
    state = rootReducer(state, keyClicked(KeyCode.Three));
    expect(state.stack.elements[0]).toEqual('3');
    state = rootReducer(state, toggleAbout());
    expect(state.about.show).toBe(true);
    expect(state.stack.elements[0]).toEqual('3');
  });
});

import { describe, it, expect } from 'vitest';
import { aboutReducer } from './reducer';
import { toggleAbout } from './actions';
import { AboutState } from './state';

describe('about reducer', () => {
  it('should return initial state', () => {
    const state = aboutReducer(undefined, toggleAbout());
    expect(state).toBeDefined();
  });

  it('should toggle show from false to true', () => {
    const initialState: AboutState = { show: false };
    const newState = aboutReducer(initialState, toggleAbout());
    expect(newState.show).toBe(true);
  });

  it('should toggle show from true to false', () => {
    const initialState: AboutState = { show: true };
    const newState = aboutReducer(initialState, toggleAbout());
    expect(newState.show).toBe(false);
  });

  it('should return current state for unknown action', () => {
    const initialState: AboutState = { show: false };
    const newState = aboutReducer(initialState, { type: 'UNKNOWN' } as any);
    expect(newState).toEqual(initialState);
  });

  it('action creator should create correct action', () => {
    const action = toggleAbout();
    expect(action.type).toBe('TOGGLE_ABOUT');
  });
});

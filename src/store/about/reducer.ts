import { AboutState } from './state';
import { AboutActionTypes, TOGGLE_ABOUT } from './actions';

const initialState: AboutState = {
  show: false
};

export function aboutReducer(
  state = initialState,
  action: AboutActionTypes
): AboutState {
  switch (action.type) {
    case TOGGLE_ABOUT:
      return { ...state, show: !state.show };
    default:
      return state;
  }
}

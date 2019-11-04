import { combineReducers } from 'redux';
import { stackReducer as stack } from './stack/reducer';
import { aboutReducer as about } from './about/reducer';
import { StackState } from './stack/state';
import { AboutState } from './about/state';

export default combineReducers({
  stack,
  about
});

export interface AppState {
  stack: StackState;
  about: AboutState;
}

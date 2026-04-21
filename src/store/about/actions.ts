export const TOGGLE_ABOUT = 'TOGGLE_ABOUT';

interface ToggleAboutAction {
  type: typeof TOGGLE_ABOUT;
}

export type AboutActionTypes = ToggleAboutAction;

export function toggleAbout(): AboutActionTypes {
  return {
    type: TOGGLE_ABOUT
  };
}

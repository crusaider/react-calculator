import React from 'react';
import { AboutBoxComponent } from './AboutBox.component';
import './About.component.css';

export type AboutComponentProps = AboutComponentInputProps &
  AboutComponentOutputProps;

export interface AboutComponentInputProps {
  show: boolean;
}

export interface AboutComponentOutputProps {
  onToggleAbout: () => void;
}

export const AboutComponent: React.FC<AboutComponentProps> = (
  props: AboutComponentProps
) => {
  return (
    <div className="AboutComponent">
      <button onClick={e => props.onToggleAbout()}>?</button>
      {props.show ? (
        <AboutBoxComponent onClose={() => props.onToggleAbout()} />
      ) : null}
    </div>
  );
};

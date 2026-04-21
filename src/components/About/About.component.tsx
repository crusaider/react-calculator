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
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    props.onToggleAbout();
    window.setTimeout(() => buttonRef.current?.focus(), 0);
  };

  return (
    <div className="AboutComponent">
      <button
        aria-label="About React Calculator"
        onClick={_e => props.onToggleAbout()}
        ref={buttonRef}
        type="button"
      >
        ?
      </button>
      {props.show ? (
        <AboutBoxComponent onClose={handleClose} />
      ) : null}
    </div>
  );
};

import React from 'react';
import './AboutBox.component.css';

interface AboutBoxComponentProps {
  onClose: () => void;
}

export const AboutBoxComponent: React.FC<AboutBoxComponentProps> = (
  props: AboutBoxComponentProps
) => {
  return (
    <div className="AboutBoxComponent" onClick={e => props.onClose()}>
      <div>
        <h1>React Calculator</h1>
        <div>My first React based app trying out React and Redux!</div>
      </div>
    </div>
  );
};

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
        <p>
          The calculator uses something called RPN (<u>R</u>everse <u>P</u>olish
          <u>N</u>otation) as a alternative to parentheses and operator
          priority.
        </p>
        <p>
          RPN calculators was first introduced by Hewlett Packard on the HP 9100
          model in 1968.
        </p>
        <p>
          To learn more about RPN and HP calculators please visit{' '}
          <a target="_blank" href="https://www.hpmuseum.org/">
            https://www.hpmuseum.org/
          </a>
          .
        </p>
        <p>
          <small>
            This app was built using React/Redux as a limited project to get a
            grip of React.
          </small>
        </p>
      </div>
    </div>
  );
};

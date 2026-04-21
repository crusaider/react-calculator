import React from 'react';
import { DisplayLineComponent } from './DisplayLine.component';
import './Display.component.css';

export interface DisplayComponentProps {
  elements: string[];
}

export const DisplayComponent: React.FC<DisplayComponentProps> = (
  props: DisplayComponentProps
) => {
  const lines = Object.assign([], props.elements)
    .reverse()
    .slice(0, 3)
    .reverse();

  return (
    <output
      aria-atomic="true"
      aria-label="Calculator display"
      aria-live="polite"
      className="DisplayComponent"
    >
      {lines.map((element, index) => (
        <DisplayLineComponent key={index} content={element} />
      ))}
    </output>
  );
};

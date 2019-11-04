import React from 'react';
import './DisplayLine.component.css';

interface DisplayLineComponentProps {
  content: string;
}

export const DisplayLineComponent: React.FC<DisplayLineComponentProps> = (
  props: DisplayLineComponentProps
) => {
  return <div className="DisplayLine">{props.content}</div>;
};

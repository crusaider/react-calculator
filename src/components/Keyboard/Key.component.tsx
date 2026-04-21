import React from 'react';
import './Key.component.css';

interface KeyComponentProps {
  label: string;
  classes?: string;
  onClick: (e: any) => void;
}

export const KeyComponent: React.FC<KeyComponentProps> = (
  props: KeyComponentProps
) => {
  return (
    <div
      className={`Key${props.classes ? ' ' + props.classes : ''}`}
      onClick={props.onClick}
    >
      <div>{props.label}</div>
    </div>
  );
};

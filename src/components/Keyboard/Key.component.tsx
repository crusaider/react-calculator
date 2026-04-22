import React from 'react';
import './Key.component.css';

interface KeyComponentProps {
  label: string;
  keyCode: number;
  ariaLabel?: string;
  classes?: string;
  onClick: (e: any) => void;
}

export const KeyComponent: React.FC<KeyComponentProps> = (
  props: KeyComponentProps
) => {
  return (
    <button
      aria-label={props.ariaLabel ?? props.label}
      className={`Key${props.classes ? ' ' + props.classes : ''}`}
      data-key-code={props.keyCode}
      onClick={props.onClick}
      type="button"
    >
      {props.label}
    </button>
  );
};

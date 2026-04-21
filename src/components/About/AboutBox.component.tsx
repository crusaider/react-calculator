import React from 'react';
import './AboutBox.component.css';

interface AboutBoxComponentProps {
  onClose: () => void;
}

export const AboutBoxComponent: React.FC<AboutBoxComponentProps> = (
  props: AboutBoxComponentProps
) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      props.onClose();
      return;
    }

    if (event.key !== 'Tab' || !dialogRef.current) {
      return;
    }

    const focusableElements = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')
    );
    const orderedFocus = [dialogRef.current, ...focusableElements.filter((element) => element !== dialogRef.current)];

    if (orderedFocus.length === 1) {
      event.preventDefault();
      dialogRef.current.focus();
      return;
    }

    const activeElement = document.activeElement as HTMLElement | null;
    const currentIndex = orderedFocus.findIndex((element) => element === activeElement);
    const atStart = currentIndex <= 0;
    const atEnd = currentIndex === orderedFocus.length - 1;

    if (event.shiftKey && atStart) {
      event.preventDefault();
      orderedFocus[orderedFocus.length - 1].focus();
    } else if (!event.shiftKey && atEnd) {
      event.preventDefault();
      orderedFocus[0].focus();
    }
  };

  return (
    <div className="AboutBoxComponent" onClick={_e => props.onClose()}>
      <dialog
        aria-describedby="about-description"
        aria-labelledby="about-title"
        aria-modal="true"
        className="AboutBoxDialog"
        open
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
        ref={dialogRef}
      >
        <h1 id="about-title">React Calculator</h1>
        <p>
          The calculator uses something called RPN (<u>R</u>everse <u>P</u>olish
          <u>N</u>otation) as a alternative to parentheses and operator
          priority.
        </p>
        <p id="about-description">
          RPN calculators was first introduced by Hewlett Packard on the HP 9100
          model in 1968.
        </p>
        <p>
          To learn more about RPN and HP calculators please visit{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.hpmuseum.org/"
          >
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
      </dialog>
    </div>
  );
};

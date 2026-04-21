// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AboutComponent } from './About.component';

describe('AboutComponent', () => {
  it('does not render the modal when show is false', () => {
    const onToggleAbout = vi.fn();

    render(<AboutComponent show={false} onToggleAbout={onToggleAbout} />);

    expect(screen.queryByText('The calculator uses something called RPN')).toBeNull();
  });

  it('renders the modal when show is true and toggles from button', () => {
    const onToggleAbout = vi.fn();

    render(<AboutComponent show={true} onToggleAbout={onToggleAbout} />);

    expect(screen.getByText('React Calculator')).toBeTruthy();
    expect(
      screen.getByRole('dialog', { name: 'React Calculator' }).getAttribute(
        'aria-modal'
      )
    ).toBe('true');

    fireEvent.click(screen.getByRole('button', { name: 'About React Calculator' }));
    expect(onToggleAbout).toHaveBeenCalledTimes(1);
  });

  it('closes the modal with Escape', () => {
    const onToggleAbout = vi.fn();

    render(<AboutComponent show={true} onToggleAbout={onToggleAbout} />);

    fireEvent.keyDown(screen.getByRole('dialog', { name: 'React Calculator' }), {
      key: 'Escape'
    });

    expect(onToggleAbout).toHaveBeenCalledTimes(1);
  });
});

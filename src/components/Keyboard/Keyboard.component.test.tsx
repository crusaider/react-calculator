// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { KeyboardComponent } from './Keyboard.component';
import { KeyCode } from '../../store/stack/actions';

describe('KeyboardComponent', () => {
  it('renders all calculator keys', () => {
    const onKeyClick = vi.fn();
    render(<KeyboardComponent onKeyClick={onKeyClick} />);

    expect(screen.getByRole('group', { name: 'Calculator keypad' })).toBeTruthy();
    expect(screen.getAllByRole('button').length).toBe(18);
  });

  it('dispatches the correct key code for + and +/-', () => {
    const onKeyClick = vi.fn();
    render(<KeyboardComponent onKeyClick={onKeyClick} />);

    const plusKey = screen.getByRole('button', { name: 'Add' });
    const switchSignKey = screen.getByRole('button', { name: 'Change sign' });

    fireEvent.click(plusKey);
    fireEvent.click(switchSignKey);

    expect(onKeyClick).toHaveBeenCalledWith(KeyCode.Add);
    expect(onKeyClick).toHaveBeenCalledWith(KeyCode.SwitchSign);
  });
});

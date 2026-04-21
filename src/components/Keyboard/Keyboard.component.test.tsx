// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { KeyboardComponent } from './Keyboard.component';
import { KeyCode } from '../../store/stack/actions';

describe('KeyboardComponent', () => {
  it('renders all calculator keys', () => {
    const onKeyClick = vi.fn();
    const { container } = render(<KeyboardComponent onKeyClick={onKeyClick} />);

    expect(container.querySelectorAll('.Key').length).toBe(18);
  });

  it('dispatches the correct key code for + and +/-', () => {
    const onKeyClick = vi.fn();
    const { container } = render(<KeyboardComponent onKeyClick={onKeyClick} />);

    const plusKey = container.querySelector('.Key.PlusKey');
    const switchSignKey = Array.from(container.querySelectorAll('.Key')).find(
      (el) => el.textContent?.trim() === '+/-'
    );

    expect(plusKey).toBeTruthy();
    expect(switchSignKey).toBeTruthy();

    fireEvent.click(plusKey as Element);
    fireEvent.click(switchSignKey as Element);

    expect(onKeyClick).toHaveBeenCalledWith(KeyCode.Add);
    expect(onKeyClick).toHaveBeenCalledWith(KeyCode.SwitchSign);
  });
});

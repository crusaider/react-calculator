// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DisplayComponent } from './Display.component';

describe('DisplayComponent', () => {
  it('renders only the latest three lines in original order', () => {
    const { container } = render(
      <DisplayComponent elements={['1', '2', '3', '4']} />
    );

    const lines = Array.from(container.querySelectorAll('.DisplayLine')).map(
      (el) => el.textContent
    );

    expect(lines).toEqual(['2', '3', '4']);
  });
});

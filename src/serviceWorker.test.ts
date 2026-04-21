// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { register, unregister } from './serviceWorker';

describe('serviceWorker', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalPublicUrl = process.env.PUBLIC_URL;

  beforeEach(() => {
    process.env.NODE_ENV = 'test';
    process.env.PUBLIC_URL = undefined;

    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: {
        register: vi.fn(),
        ready: Promise.resolve({ unregister: vi.fn() })
      }
    });
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    process.env.PUBLIC_URL = originalPublicUrl;
    vi.restoreAllMocks();
  });

  it('does not register in non-production mode', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    register();

    expect(addEventListenerSpy).not.toHaveBeenCalledWith(
      'load',
      expect.any(Function)
    );
  });

  it('does not register when PUBLIC_URL has a different origin', () => {
    process.env.NODE_ENV = 'production';
    process.env.PUBLIC_URL = 'https://cdn.example.com';

    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    register();

    expect(addEventListenerSpy).not.toHaveBeenCalledWith(
      'load',
      expect.any(Function)
    );
  });

  it('unregister calls navigator.serviceWorker.ready.unregister', async () => {
    const unregisterMock = vi.fn();

    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: {
        register: vi.fn(),
        ready: Promise.resolve({ unregister: unregisterMock })
      }
    });

    unregister();
    await Promise.resolve();

    expect(unregisterMock).toHaveBeenCalledTimes(1);
  });
});

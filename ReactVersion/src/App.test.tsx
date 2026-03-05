import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get length() { return Object.keys(store).length; },
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe('App', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should render the app', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.app-container')).toBeInTheDocument();
  });

  it('should initialize with empty hells', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.hell-item')).not.toBeInTheDocument();
  });

  it('should initialize stats count to zero', () => {
    render(<App />);
    const statsBar = screen.getByText(/Total Hells Observed/);
    expect(statsBar).toHaveTextContent('0');
  });

  it('should render title in an h1 tag', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Fresh Hell!');
  });

  it('should not submit when form is empty', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const submitButton = screen.getByRole('button', { name: /Increase Hell/i });
    await user.click(submitButton);
    expect(container.querySelector('.hell-item')).not.toBeInTheDocument();
  });

  it('should add a hell entry on valid submit', async () => {
    const user = userEvent.setup();
    render(<App />);
    const textarea = screen.getByPlaceholderText('What happened this time…');
    const submitButton = screen.getByRole('button', { name: /Increase Hell/i });
    await user.type(textarea, 'Spilled coffee');
    await user.click(submitButton);
    expect(screen.getByText('Spilled coffee')).toBeInTheDocument();
  });

  it('should reset the form after submission', async () => {
    const user = userEvent.setup();
    render(<App />);
    const textarea = screen.getByPlaceholderText('What happened this time…');
    const submitButton = screen.getByRole('button', { name: /Increase Hell/i });
    await user.type(textarea, 'Flat tire');
    await user.click(submitButton);
    expect(textarea).toHaveValue('');
  });

  it('should display total hells count', () => {
    const { container } = render(<App />);
    const statsBar = container.querySelector('.stats-bar');
    expect(statsBar).toHaveTextContent('0');
  });
});

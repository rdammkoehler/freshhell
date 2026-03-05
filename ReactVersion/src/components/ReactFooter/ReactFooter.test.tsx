import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReactFooter from './ReactFooter';

describe('ReactFooter', () => {
  it('should render', () => {
    const { container } = render(<ReactFooter />);
    expect(container.querySelector('.react-footer')).toBeInTheDocument();
  });
});

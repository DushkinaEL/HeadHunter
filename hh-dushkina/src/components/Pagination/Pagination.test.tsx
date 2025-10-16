import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '..';
import { describe, it, vi, expect } from 'vitest';
import { MantineTestWrapper } from '../../__test__/test-utils';

describe('Pagination', () => {
  it('calls onChange on page click', () => {
    const onChange = vi.fn();
    render(<Pagination page={1} total={3} onChange={onChange} />, {
      wrapper: MantineTestWrapper,
    });
    fireEvent.click(screen.getByText('2'));
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
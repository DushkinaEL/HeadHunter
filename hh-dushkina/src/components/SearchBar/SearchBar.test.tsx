import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '..';
import { describe, it, vi, expect } from 'vitest';
import { MantineTestWrapper } from '../../__test__/test-utils';

describe('SearchBar', () => {
  it('calls onSearch when button clicked', () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();
    render(<SearchBar value="" onChange={onChange} onSearch={onSearch} />, {
      wrapper: MantineTestWrapper,
    });
    fireEvent.click(screen.getByText('Найти'));
    expect(onSearch).toHaveBeenCalled();
  });
  it('calls onChange on input', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} onSearch={() => {}} />, {
      wrapper: MantineTestWrapper,
    });
    fireEvent.change(screen.getByPlaceholderText(/должность/i), { target: { value: 'React' } });
    expect(onChange).toHaveBeenCalled();
  });
});
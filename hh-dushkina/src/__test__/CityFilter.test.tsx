import { render, screen, fireEvent } from '@testing-library/react';
import { CityFilter } from '../components';
import { describe, it, vi, expect } from 'vitest';
import { MantineTestWrapper } from './test-utils';

describe('CityFilter', () => {
  it('selects city', () => {
  const onChange = vi.fn();
  render(<CityFilter value="" onChange={onChange} />, {
    wrapper: MantineTestWrapper,
  });

  const input = screen.getByPlaceholderText(/город/i) || screen.getByPlaceholderText(/Все города/i);
  expect(input).toBeTruthy();

  fireEvent.mouseDown(input);

  const cityOption = screen.getByText('Москва');
  fireEvent.click(cityOption);
  expect(onChange).toHaveBeenCalled();
});
});
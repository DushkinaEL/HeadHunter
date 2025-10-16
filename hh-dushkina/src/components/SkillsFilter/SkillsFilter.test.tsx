import { render, screen, fireEvent } from '@testing-library/react';
import { SkillsFilter } from '..';
import { describe, it, vi, expect } from 'vitest';
import { MantineTestWrapper } from '../../__test__/test-utils';

describe('SkillsFilter', () => {
  it('adds skill', () => {
    const addSkill = vi.fn();
    render(<SkillsFilter skills={[]} addSkill={addSkill} removeSkill={() => {}} />, {
      wrapper: MantineTestWrapper,
    });
    fireEvent.change(screen.getByPlaceholderText(/Навык/i), { target: { value: 'React' } });
    fireEvent.keyDown(screen.getByPlaceholderText(/Навык/i), { key: 'Enter' });
    expect(addSkill).toHaveBeenCalledWith('React');
  });

  it('removes skill', () => {
    const removeSkill = vi.fn();
    render(<SkillsFilter skills={['React']} addSkill={() => {}} removeSkill={removeSkill} />, {
      wrapper: MantineTestWrapper,
    });
    const removeBtn = screen.getByTestId('remove-skill-React');
    fireEvent.click(removeBtn);
    expect(removeSkill).toHaveBeenCalledWith('React');
  });
});
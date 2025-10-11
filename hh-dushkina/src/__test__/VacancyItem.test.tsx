import { render, screen } from '@testing-library/react';
import { VacancyItem } from '../components';
import { describe, it, expect } from 'vitest';
import { MantineTestWrapper } from './test-utils';

const vacancy = {
  id: '1',
  name: 'Frontend разработчик',
  salary: { from: 100000, to: 150000 },
  experience: { id: 'exp1', name: '1-3 года' },
  employer: { name: 'Компания' },
  schedule: { id: 'remote', name: 'Удаленно' },
  area: { name: 'Москва' },
  alternate_url: 'https://hh.ru/vacancy/1',
  url: 'https://api.hh.ru/vacancies/1', 
  key_skills:[],          
};

describe('VacancyItem', () => {
  it('renders vacancy info and откликнуться button', () => {
    render(
        <VacancyItem vacancy={vacancy} />, {
          wrapper: MantineTestWrapper,
        }
);
    expect(screen.getByText('Frontend разработчик')).toBeInTheDocument();
    expect(screen.getByText(/100 000 – 150 000 ₽/)).toBeInTheDocument();
    expect(screen.getByText(/1-3 года/)).toBeInTheDocument();
    expect(screen.getByText('Компания')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();
    const откликButton = screen.getByText('Откликнуться');
    expect(откликButton.closest('a')).toHaveAttribute('href', vacancy.alternate_url);
  });
});
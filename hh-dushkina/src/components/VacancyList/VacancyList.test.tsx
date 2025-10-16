import { render, screen } from '@testing-library/react';
import { VacancyList } from '..';
import { describe, it, expect } from 'vitest';
import { MantineTestWrapper } from '../../__test__/test-utils';

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

describe('VacancyList', () => {
  it('shows loading', () => {
    render(<VacancyList vacancies={[]} loading={true} error={null} />, {
      wrapper: MantineTestWrapper,
    });
    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
  });
  it('shows error', () => {
    render(<VacancyList vacancies={[]} loading={false} error="Ошибка" />, {
      wrapper: MantineTestWrapper,
    });
    expect(screen.getByText(/Ошибка/i)).toBeInTheDocument();
  });
  it('shows empty', () => {
    render(<VacancyList vacancies={[]} loading={false} error={null} />, {
      wrapper: MantineTestWrapper,
    });
    expect(screen.getByText(/Нет вакансий/i)).toBeInTheDocument();
  });
  it('renders vacancies', () => {
    render(<VacancyList vacancies={[vacancy]} loading={false} error={null} />, {
      wrapper: MantineTestWrapper,
    });
    expect(screen.getByText('Frontend разработчик')).toBeInTheDocument();
  });
});
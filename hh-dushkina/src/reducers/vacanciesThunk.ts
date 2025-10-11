import { createAsyncThunk } from "@reduxjs/toolkit";
import type { VacanciesState } from "./vacanciesSlice";


export const fetchVacancies = createAsyncThunk(
  'vacancies/fetchVacancies',
  async (_, { getState }) => {
    const state = getState() as { vacancies: VacanciesState };
    const { text, area } = state.vacancies.filters;

    const params = new URLSearchParams({
      industry: '7',
      professional_role: '96',
      per_page: '10',
      text,
    });
    if (area) params.append('area', area);

    const response = await fetch(`https://api.hh.ru/vacancies?${params.toString()}`);
    if (!response.ok) throw new Error('Ошибка загрузки вакансий');
    const data = await response.json();
    console.log('API vacancies data:', data);
console.log('key_skills of first vacancy:', data.items[0]?.key_skills);

    return data;
  }
);
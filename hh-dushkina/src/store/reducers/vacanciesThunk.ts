import { createAsyncThunk } from "@reduxjs/toolkit";
import type { VacanciesState } from "./vacanciesSlice";
import type { Vacancy } from "./vacanciesTypes";

export type FetchVacanciesResult = {
  data: {
    items?: Vacancy[];
    pages?: number;
    found?: number;
 
  };
  fetchKey?: string | null;
};
export const fetchVacancies = createAsyncThunk<
  FetchVacanciesResult, 
  void,                 
  { state: { vacancies: VacanciesState } } 
>(
  'vacancies/fetchVacancies',
  async (_, { getState }) => {
    const state = getState() as { vacancies: VacanciesState };
    const { text, area, skills } = state.vacancies.filters;
    const currentPage = state.vacancies.currentPage;
    const queryText = [text, ...skills].join(" ");

    const fetchKey = JSON.stringify({ text, area, skills: skills.slice(), page: currentPage });

    const params = new URLSearchParams({
      industry: '7',
      professional_role: '96',
      per_page: '10',
      text: queryText,
      page: currentPage.toString(),
    });
    if (area) params.append('area', area);

    const response = await fetch(`https://api.hh.ru/vacancies?${params.toString()}`);
    if (!response.ok) throw new Error('Ошибка загрузки вакансий');
    const data = await response.json();

    return { data, fetchKey };
  }
);
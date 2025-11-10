import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Vacancy } from './vacanciesTypes';
import { fetchVacancies, type FetchVacanciesResult } from './vacanciesThunk';

 export type VacanciesState = {
  items: Vacancy[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  filters: {
    text: string;
    area: string;
    skills: string[];
  };
  lastFetchKey?: string | null;
};

const initialState: VacanciesState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  filters: {
    text: '',
    area: '',
    skills: ['TypeScript', 'React', 'Redux'],
  },
  lastFetchKey: null,
};


const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setText(state, action: PayloadAction<string>) {
      state.filters.text = action.payload;
    },
    setArea(state, action: PayloadAction<string>) {
      state.filters.area = action.payload;
    },
    addSkill(state, action: PayloadAction<string>) {
      if (!state.filters.skills.includes(action.payload)) {
        state.filters.skills.push(action.payload);
      }
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.filters.skills = state.filters.skills.filter(skill => skill !== action.payload);
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSkills(state, action: PayloadAction<string[]>) {
  state.filters.skills = action.payload;
  state.currentPage = 1;
}
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVacancies.pending, state => {
        state.loading = true;
        state.error = null;
      })
       .addCase(fetchVacancies.fulfilled, (state, action) => {
        const payload: FetchVacanciesResult = action.payload as FetchVacanciesResult;
        const data = payload?.data ?? {};
        let items: Vacancy[] = Array.isArray(data) ? (data as unknown as Vacancy[]) : (data.items ?? []);

        const selectedSkills = state.filters.skills.map(s => s.trim().toLowerCase()).filter(Boolean);
        if (selectedSkills.length > 0 && Array.isArray(items)) {
          items = items.filter(vacancy => {
            const req = (vacancy.snippet?.requirement || vacancy.snippet?.requirement || '').toLowerCase();
            if (!req) return false;
            return selectedSkills.every(skill => req.includes(skill));
          });
        }
        state.items = items;
        const realTotalPages = Math.ceil(action.payload?.data?.found ?? 0 / 10);
        state.totalPages = Math.min(realTotalPages, 10);
        state.loading = false;
        state.error = null;
        state.lastFetchKey = payload?.fetchKey ?? null;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Ошибка загрузки вакансий';
      });
  },
});

export const {
  setText,
  setArea,
  addSkill,
  removeSkill,
  setPage,
  setSkills,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
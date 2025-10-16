import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Vacancy } from './vacanciesTypes';
import { fetchVacancies } from './vacanciesThunk';

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
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVacancies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.loading = false;

 
const selectedSkills = state.filters.skills.map(s => s.trim().toLowerCase());
let items = action.payload.items as Vacancy[];

if (selectedSkills.length > 0) {
  items = items.filter(vacancy => {
    const req = vacancy.snippet?.requirement?.toLowerCase();
    if (!req) return false;
    return selectedSkills.every(skill => req.includes(skill));
  });
}
state.items = items;
        state.totalPages = Math.ceil(action.payload.found / 10);
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка загрузки вакансий';
      });
  },
});

export const {
  setText,
  setArea,
  addSkill,
  removeSkill,
  setPage,
} = vacanciesSlice.actions;

export default vacanciesSlice.reducer;
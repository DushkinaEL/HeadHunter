import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import {
  setText,
  setArea,
  addSkill,
  removeSkill,
  setPage,
} from '../store/reducers/vacanciesSlice';
import { useCallback, useEffect } from 'react';
import { fetchVacancies } from '../store/reducers/vacanciesThunk';


export function useVacancies() {
  const dispatch = useDispatch<AppDispatch>(); 
  const vacancies = useSelector((state: RootState) => state.vacancies);

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [vacancies.filters, vacancies.currentPage, dispatch]);
    const fetchVacanciesManually = useCallback(() => {
    dispatch(fetchVacancies());
  }, [dispatch]);


  return {
    ...vacancies,
    setText: (text: string) => dispatch(setText(text)),
    setArea: (area: string) => dispatch(setArea(area)),
    addSkill: (skill: string) => dispatch(addSkill(skill)),
    removeSkill: (skill: string) => dispatch(removeSkill(skill)),
    setPage: (page: number) => dispatch(setPage(page)),
    fetchVacancies: fetchVacanciesManually,
  };
}
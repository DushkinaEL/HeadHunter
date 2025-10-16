import type { Vacancy } from '../../store/reducers/vacanciesTypes';
import { VacancyItem } from '../VacancyItem/VacancyItem';
import { Stack, Box } from '@mantine/core';
import styles from './VacancyList.module.css';

type Props = {
  vacancies: Vacancy[];
  loading: boolean;
  error: string | null;
};

export function VacancyList({ vacancies, loading, error } : Props) {
  if (loading) return <Box>Загрузка...</Box>;
  if (error) return <Box className={styles.error}>{error}</Box>;
  if (!vacancies.length) return (
    <Box className={styles.empty}>
      Нет вакансий
    </Box>
  );

  return (
    <Stack className={styles.listContainer}>
      {vacancies.map(vacancy => (
        <VacancyItem key={vacancy.id} vacancy={vacancy} />
      ))}
    </Stack>
  );
}
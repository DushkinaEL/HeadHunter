import { Card, Group, Text, Badge, Button, Stack } from '@mantine/core';
import type { Vacancy } from '../../store/reducers/vacanciesTypes';
import styles from '../VacancyItem/VacancyItem.module.css';

type Props = {
  vacancy: Vacancy;
  showShowButton?: boolean;
  onShow?: () => void;
    applyButtonText?: string; 
  applyButtonClassName?: string; 
};

function formatSalary(value?: number | null): string {
  if (typeof value !== 'number') return '—';
  return value.toLocaleString('ru-RU').replace(/\u00A0/g, ' ');
}

function getSalaryRange(salary?: { from?: number | null, to?: number | null }): string {
  if (!salary || (salary.from == null && salary.to == null)) {
    return '—';
  }
  if (salary.from != null && salary.to != null) {
    return `${formatSalary(salary.from)} – ${formatSalary(salary.to)} ₽`;
  }
  if (salary.from != null) {
    return `${formatSalary(salary.from)} ₽`;
  }
  if (salary.to != null) {
    return `${formatSalary(salary.to)} ₽`;
  }
  return '—';
}

export function VacancyCard({ vacancy,
  showShowButton = false,
  onShow,
  applyButtonText = "Откликнуться",
  applyButtonClassName = styles.buttonAlt, }: Props) {
  const experience = vacancy.experience?.name ?? '—';
  const remote = vacancy.schedule?.id === 'remote' || vacancy.schedule?.name?.toLowerCase().includes('удал');
  const office = vacancy.schedule?.id === 'fullDay' || vacancy.schedule?.name?.toLowerCase().includes('офис');
  const hybrid = vacancy.schedule?.name?.toLowerCase().includes('гибрид');

  return (
    <Card shadow="sm" padding={24} radius={12} className={styles.card}>
      <Stack gap={10}>
        <Text className={styles.title}>
          {vacancy.name}
        </Text>
        <Group className={styles.salaryExp}>
          <Text className={styles.salary}>{getSalaryRange(vacancy.salary)}</Text>
          <Text className={styles.experience}>{experience}</Text>
        </Group>
        <Text className={styles.company}>
          {vacancy.employer?.name ?? '—'}
        </Text>
        <Group className={styles.badges}>
          {remote && (
            <Badge className={`${styles.badge} ${styles.badgeRemote}`}>Можно удалённо</Badge>
          )}
          {office && (
            <Badge className={`${styles.badge} ${styles.badgeOffice}`}>Офис</Badge>
          )}
          {hybrid && (
            <Badge className={`${styles.badge} ${styles.badgeHybrid}`}>Гибрид</Badge>
          )}
        </Group>
        <Text className={styles.location}>
          {vacancy.area?.name ?? '—'}
        </Text>
        <Group className={styles.buttons}>
          {showShowButton && (
            <Button className={styles.buttonMain} onClick={onShow}>
              Смотреть вакансию
            </Button>
          )}
          <Button
            className={applyButtonClassName}
            component="a"
            href={vacancy.alternate_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {applyButtonText}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
import { Group, Pagination } from '@mantine/core';
import styles from './Pagination.module.css';

type Props = {
  page: number;
  total: number;
  onChange: (page: number) => void;
};

export function CustomPagination({ page, total, onChange }: Props) {
  return (
    <Pagination.Root total={total} value={page} onChange={onChange} className={styles.pagination}>
      <Group gap={5} justify="center">
        <Pagination.First />
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
  );
}
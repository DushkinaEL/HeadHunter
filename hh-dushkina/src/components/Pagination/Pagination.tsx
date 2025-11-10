import { Box, Group, Loader, Pagination } from '@mantine/core';
import styles from './Pagination.module.css';

type Props = {
  page: number;
  total: number;
  groupSize?: number;
  onChange: (page: number) => void;
  loading?: boolean;
};

export function CustomPagination({ page, total, onChange, loading, }: Props) {
  if (loading) return (
    <Box className={styles.loaderWrapper}>
        <Loader color="blue" size="lg" />
      </Box>)
  if (total <= 1) return null;

  return ( 
    <Pagination.Root total={total}
      value={page} onChange={onChange} className={styles.pagination}>
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
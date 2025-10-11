import { Pagination as MantinePagination } from '@mantine/core';
import styles from './Pagination.module.css';

type Props = {
  page: number;
  total: number;
  onChange: (p: number) => void;
};

export function Pagination({ page, total, onChange }: Props) {
  return (
    <div className={styles.pagination}>
      <MantinePagination
        value={page}
        onChange={onChange}
        total={total}
        size="md"
        radius="xs"
        withEdges
        withControls
        classNames={{
          control: styles.control,
          dots: styles.dots,
        }}
      />
    </div>
  );
}
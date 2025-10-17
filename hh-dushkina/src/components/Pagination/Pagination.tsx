import { Group, Pagination } from '@mantine/core';

type Props = {
  page: number;
  total: number;
  onChange: (page: number) => void;
};

export function CustomPagination({ page, onChange }: Props) {
  return (
    <Pagination.Root total={10} value={page} onChange={onChange}>
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
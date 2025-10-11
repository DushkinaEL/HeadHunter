import { Box, Select } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { useState } from 'react';
import styles from './CityFilter.module.css';

const cities = [
  { value: '', label: 'Все города' },
  { value: '1', label: 'Москва' },
  { value: '2', label: 'Санкт-Петербург' },
];

type Props = {
  value: string;
  onChange: (city: string) => void;
};

export function CityFilter({ value, onChange }: Props) {
  const [opened, setOpened] = useState(false);
  return (
    <Box className={styles.container}>
      <Select
        data={cities}
        value={value}
        onChange={city => onChange(city ?? '')}
        radius={12}
        size="sm"
        placeholder="Все города"
        leftSection={<IconMapPin size={20} color="#0F0F104D" />}
        classNames={{
          root: styles.select,
          input: `${styles.input} ${opened ? styles.inputActive : ''} ${!value ? styles.inputPlaceholder : ''}`,
          dropdown: styles.dropdown,
          option: styles.option,
        }}
        onDropdownOpen={() => setOpened(true)}
        onDropdownClose={() => setOpened(false)}
      />
    </Box>
  );
}
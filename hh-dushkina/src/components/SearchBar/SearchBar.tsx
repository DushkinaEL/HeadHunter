import { TextInput, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import styles from './SearchBar.module.css';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onSearch: () => void;
};

export function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <div className={styles.searchBar}>
      <TextInput
        placeholder="Должность или название компании"
        value={value}
        onChange={e => onChange(e.target.value)}
        size="md"
        radius={8}
        leftSection={<IconSearch size={20} color="#0F0F104D" />}
        inputWrapperOrder={['input']}
        className={styles.input}
        classNames={{ input: styles.inputField }}
      />
      <Button className={styles.button} onClick={onSearch} type="button">
        Найти
      </Button>
    </div>
  );
}
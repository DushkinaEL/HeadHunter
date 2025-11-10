import { TextInput, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import styles from './SearchBar.module.css';
import { useDebouncedValue } from '@mantine/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onSearch: () => void;
  debounceMs?: number;
};

export function SearchBar({ value, onChange, onSearch,
  debounceMs = 500, }: Props) {
    const [query, setQuery] = useState<string>(value);
  const [debounced, cancel] = useDebouncedValue(query, debounceMs);

  const mountedRef = useRef(false);
  const lastSentRef = useRef<string>(value);
   useEffect(() => {
    if (value !== query) setQuery(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

   useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      lastSentRef.current = value;
      return;
    }
    if (debounced !== lastSentRef.current) {
      lastSentRef.current = debounced;
      onChange(debounced);
    }
  }, [debounced, onChange, value]);

  useEffect(() => () => cancel?.(), [cancel]);


  const doSearch = useCallback(() => {
    if (query !== lastSentRef.current) {
      lastSentRef.current = query;
      onChange(query);
    }
    onSearch?.();
  }, [query, onChange, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') doSearch();
  };
  return (
    <div className={styles.searchBar}>
      <TextInput
        placeholder="Должность или название компании"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        size="md"
        radius={8}
        leftSection={<IconSearch size={20} color="#0F0F104D" />}
        inputWrapperOrder={['input']}
        className={styles.input}
        classNames={{ input: styles.inputField }}
      />
      <Button className={styles.button} onClick={doSearch}>
        Найти
      </Button>
    </div>
  );
}
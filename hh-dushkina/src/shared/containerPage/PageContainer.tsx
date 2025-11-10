import type { PropsWithChildren } from 'react';
import { Box } from '@mantine/core';
import styles from './PageContainer.module.css';
import { Header } from '../../components';
type Props = PropsWithChildren<{
  className?: string;
}>;

export function PageContainer({ children, className }: Props) {
  return (
    <Box className={`${styles.root} ${className ?? ''}`}>
      <Header/>
      <Box className={styles.content}>
          {children}
      </Box>
    </Box>
  );
}


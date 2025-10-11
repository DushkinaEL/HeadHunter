import { MantineProvider } from '@mantine/core';
import { mantineTheme } from '../theme/mantineTheme';

export function MantineTestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={mantineTheme}>
      {children}
    </MantineProvider>
  );
}
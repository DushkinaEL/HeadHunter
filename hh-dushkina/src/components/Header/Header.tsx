import { Text, Anchor, Box } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import logoHH from '../../assets/logoHH.svg';
import styles from './Header.module.css';

function BlueDot() {
  return <span className={styles.blueDot} />;
}

export function Header() {
  return (
    <Box component="header" className={styles.header}>
      <Box className={styles.left}>
        <img src={logoHH} alt="Logo" className={styles.logo} />
        <Text className={styles.brand}>.FrontEnd</Text>
      </Box>
      <Box className={styles.center}>
        <Anchor
          href="#"
          className={styles.navLink}
          underline="never"
        >
          Вакансии FE <BlueDot />
        </Anchor>
        <Anchor
          href="#"
          className={styles.navLinkGray}
          underline="never"
        >
          <IconUserCircle />
          Обо мне
        </Anchor>
      </Box>
      <Box />
    </Box>
  );
}
import { Text, Box } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import logoHH from '../../assets/logoHH.svg';
import styles from './Header.module.css';
import { CustomLink } from '../CustomLink/CustomLink';
import {  useMatch} from 'react-router-dom';

function BlueDot() {
  return <span className={styles.blueDot} />;
}

export function Header() {
 const isRoot = Boolean(useMatch({ path: '/', end: true }));
  const isVacanciesPath = Boolean(useMatch({ path: '/vacancies', end: false }));
  const isVacanciesActive = isRoot || isVacanciesPath;
  const isAboutActive = Boolean(useMatch({ path: '/about', end: false }));
  return (
    <Box component="header" className={styles.header}>
      <Box className={styles.left}>
        <img src={logoHH} alt="Logo" className={styles.logo} />
        <Text className={styles.brand}>.FrontEnd</Text>
      </Box>
      <Box className={styles.center}>
        <CustomLink to="/" className={styles.navLink} activeOverride={isVacanciesActive}>
          Вакансии FE {isVacanciesActive ? <BlueDot /> : null}
        </CustomLink>
        <CustomLink to="/about" className={styles.navLinkGray} activeOverride={isAboutActive}>
          <IconUserCircle />
          Обо мне {isAboutActive ? <BlueDot /> : null}
        </CustomLink>
      </Box>
      <Box />
    </Box>
  );
}
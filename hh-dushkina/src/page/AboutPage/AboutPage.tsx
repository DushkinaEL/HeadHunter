import { Box, Text, Title } from '@mantine/core';
import styles from "./AboutPage.module.css";

export function AboutPage() {
  return (
    <Box className={styles.root}>
      <Box className={styles.card}>
        <Title w={700} size="xl" className={styles.title}>Обо мне</Title>
        <Text className={styles.name}> Душкина Екатерина</Text>
        <Text mt="sm" className={styles.description}>
          Привет! Я — Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit. 
          <Text>Хочу развиваться в этой сфере.
          Нужен сон, но работа нужна больше. 
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
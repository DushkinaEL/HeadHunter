import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  Loader,
  Stack,
  Text,
  Container,
  Box,
} from "@mantine/core";
import type { Vacancy } from "../../store/reducers/vacanciesTypes";
import { Header } from "../../components";
import styles from '../HomePage.module.css';
import vacancyCardStyles from "../../components/VacancyItem/VacancyItem.module.css"
import { VacancyCard } from "../../components/VacancyCard/VacancyCard";


export function VacancyPage() {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.hh.ru/vacancies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVacancy(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <Box style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        width: "100vw"}}>
      <Loader color="blue" size="lg" />
    </Box>)
  if (!vacancy) return <Text ta="center" mt="xl">Вакансия не найдена</Text>;
  return (
    <Box className={styles.root}>
        <Header/>
      <Container size="sm" mt={24}>
        <Stack gap={24}>
          <VacancyCard
  vacancy={vacancy}
  showShowButton={false}
  applyButtonText="Откликнуться на hh.ru"
  applyButtonClassName={vacancyCardStyles.buttonMainBlack}
/>

          <Card withBorder radius={16} style={{ background: "#fff", padding: 32 }}>
            <Text fw={700} fz={18} mb={10}>
              Компания
            </Text>
            <Text mb={10} fz={15}>
              {vacancy.employer?.name
                ? <span dangerouslySetInnerHTML={{ __html: vacancy.employer?.name }} />
                : vacancy.employer?.name || "Описание компании отсутствует"}
            </Text>
            <Text fw={700} fz={18} mb={10}>
              О проекте:
            </Text>
            <Text mb={0} fz={15}>
              {vacancy.description
                ? <span dangerouslySetInnerHTML={{ __html: vacancy.description }} />
                : "Описание проекта отсутствует"}
            </Text>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
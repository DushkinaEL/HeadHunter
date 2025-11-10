import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  Loader,
  Stack,
  Text,
  Box,
  Container,
} from "@mantine/core";
import type { Vacancy } from "../../store/reducers/vacanciesTypes";
import {  VacancyItem } from "../../components";
import styles from '../../shared/RespondButton/RespondButton.module.css';
import pageStyles from "./VacancyPage.module.css";


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
   <Box className={pageStyles.loaderWrapper}>
        <Loader color="blue" size="lg" />
      </Box>)
  if (!vacancy) return <Text ta="center" mt="xl">Вакансия не найдена</Text>;
  return (
    <>
      <Container size='sm' mt={24}className={pageStyles.container}>
        <Stack gap={24} >
          <VacancyItem
            vacancy={vacancy}
            applyButtonClassName={styles.buttonMainBlack}
            showViewButton={false}
            applyButtonText="Откликнуться на hh.ru"
          />

          <Card withBorder radius={16} className={pageStyles.infoCard}>
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
      </>
  );
}

import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {  useLoaderData } from "react-router-dom";
import { Stack, Text } from "@mantine/core";
import { VacancyList } from "../../components";

export  function VacanciesListPage() {
  const loaderData = useLoaderData() as { city?: string } | null;
  const items = useSelector((s: RootState) => s.vacancies.items);
  const loading = useSelector((s: RootState) => s.vacancies.loading);
  const error = useSelector((s: RootState) => s.vacancies.error);


  return (
    <Stack gap="md" mt="md">
      <Text size="lg" w={600}>
        Вакансии — {loaderData?.city ?? "Москва"}
      </Text>
      <VacancyList vacancies={items} loading={loading} error={error} />
    </Stack>
  );
}
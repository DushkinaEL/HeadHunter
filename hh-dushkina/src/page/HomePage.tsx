import { Title, Group, Box, Text, Divider,  } from '@mantine/core';
import { Header, SearchBar, CityFilter , SkillsFilter,VacancyList, CustomPagination } from '../components';

import { useVacancies } from '../hooks/useVacancies';
import styles from './HomePage.module.css';
import { useEffect } from "react";
import { useSearchParams } from 'react-router-dom';


export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    items,
    loading,
    error,
    filters,
    setText,
    setArea,
    addSkill,
    removeSkill,
    currentPage,
    setPage,
    totalPages,
    fetchVacancies,
  } = useVacancies();

  useEffect(() => {
    const urlText = searchParams.get("text") || "";
    const urlArea = searchParams.get("area") || "";
    const urlSkills = searchParams.get("skills")?.split(",").filter(Boolean) || [];

    if (urlText !== filters.text) setText(urlText);
    if (urlArea !== filters.area) setArea(urlArea);

    if (JSON.stringify(urlSkills) !== JSON.stringify(filters.skills)) {
      filters.skills.forEach(s => removeSkill(s));
      urlSkills.forEach(s => addSkill(s));
    }
  // eslint-disable-next-line
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      text: filters.text,
      area: filters.area,
      skills: filters.skills.join(","),
    });
  }, [filters.text, filters.area, filters.skills, setSearchParams]);

  return (
    <Box className={styles.root}>
      <Header />
      <Box className={styles.content}>
        <Group className={styles.headerRow}>
          <Box className={styles.titleBlock}>
            <Title order={2} className={styles.title}>
              Список вакансий
            </Title>
            <Text size="lg" fw={500} className={styles.subtitle}>
              по профессии Frontend-разработчик
            </Text>
          </Box>
          <SearchBar
            value={filters.text}
            onChange={setText}
            onSearch={fetchVacancies}
          />
        </Group>
        <Divider className={styles.divider}></Divider>
        <Box className={styles.mainRow}>
          <Box className={styles.filtersCol}>
            <SkillsFilter
              skills={filters.skills}
              addSkill={addSkill}
              removeSkill={removeSkill}
            />
            <Box className={styles.cityBox}>
              <CityFilter
                value={filters.area}
                onChange={setArea}
              />
            </Box>
          </Box>
          <Box className={styles.vacancyCol}>
            <VacancyList
              vacancies={items}
              loading={loading}
              error={error}
            />
            <Box className={styles.paginationBox}>
              <CustomPagination
                page={currentPage}
                total={totalPages}
                onChange={setPage}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
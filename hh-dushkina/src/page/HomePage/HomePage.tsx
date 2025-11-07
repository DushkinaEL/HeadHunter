import { Title, Group, Box, Text, Divider,   } from '@mantine/core';
import {  SearchBar, SkillsFilter,VacancyList, CustomPagination, CityTabs} from '../../components';
import { useVacancies } from '../../hooks/useVacancies';
import styles from './HomePage.module.css';
import { useEffect } from "react";
import {  useNavigation, useSearchParams } from 'react-router-dom';
import {PageContainer} from '../../shared/';

function buildSearchParams(obj: Record<string, string | string[] | undefined>) {
  const sp = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v == null) return;
    if (Array.isArray(v)) {
      const filtered = v.filter(Boolean);
      if (filtered.length) sp.set(k, filtered.join(','));
    } else {
      const s = String(v).trim();
      if (s !== '') sp.set(k, s);
    }
  });
  return sp;
}

export  function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

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
    setSkills,
    totalPages,
    fetchVacancies,
  } = useVacancies();

  useEffect(() => {
    const urlText = searchParams.get("text") || "";
    const urlArea = searchParams.get("area") || "";
    const urlSkills = searchParams.get("skills")?.split(",").filter(Boolean) || [];

    if (urlText !== filters.text) setText(urlText);
    if (urlArea !== filters.area) setArea(urlArea);

    const currentSkills = filters.skills ?? [];
    const skillsEqual = JSON.stringify(urlSkills) === JSON.stringify(currentSkills);
    if (!skillsEqual) {
      if (typeof setSkills === "function") {
        setSkills(urlSkills);
      } else {
        currentSkills.forEach(s => removeSkill(s));
        urlSkills.forEach(s => addSkill(s));
      }
    }
    // eslint-disable-next-line
  }, [searchParams]);

  useEffect(() => {
    const params = buildSearchParams({
      text: filters.text,
      area: filters.area,
      skills: filters.skills.join(","),
    });
    setSearchParams(params, { replace: true });
  }, [filters.text, filters.area, filters.skills, setSearchParams]);

  return (
    <PageContainer>
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
            </Box>
            <Box className={styles.contaIner}>
              <Box className={styles.tabsRow }>
            <CityTabs
              value={filters.area}
              onChange={setArea}
              navigateOnChange={false} 
            />
          </Box>
            <Box className={styles.vacancyCol}>
            <VacancyList
              vacancies={items}
              loading={loading}
              error={error}
            />
            <Box className={styles.paginationBox}>
              {!loading && !isNavigating && totalPages > 1 && (
              <CustomPagination
                page={currentPage}
                total={totalPages}
                onChange={setPage}
              />
              )}
            </Box>
            </Box>
            </Box>
            </Box>
        </PageContainer>
  );
}
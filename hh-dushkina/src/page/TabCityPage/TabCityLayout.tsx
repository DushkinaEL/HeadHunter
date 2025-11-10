
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Tabs, Container, Box } from "@mantine/core";
import {PageContainer} from "../../shared/containerPage/PageContainer";
import styles from "./TabCityLayout.module.css";
import { CITIES } from "../../components/CityTabs/typesCity";
import { useMemo } from "react";

export  function TabCityLayout() {
  const navigate = useNavigate();
  const { city: paramCity } = useParams<{ city?: string }>();

  const active = useMemo(() => {
    return paramCity && CITIES.some(c => c.slug === paramCity) ? paramCity : "moscow";
  }, [paramCity]);

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    navigate(`/vacancies/${value}`);
  };

  return (
    <PageContainer className={styles.root}>
      <Container size="lg" className={styles.container}>
        <Box className={styles.tabsWrap}>
          <Tabs value={active} onChange={handleTabChange} variant="outline">
            <Tabs.List>
              {CITIES.map(c => (
                <Tabs.Tab key={c.slug} value={c.slug}>
                  {c.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </Box>

        <Outlet />
      </Container>
    </PageContainer>
  );
}
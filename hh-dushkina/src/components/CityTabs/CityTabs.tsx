import  { useMemo } from "react";
import { Tabs } from "@mantine/core";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./CityTabs.module.css";
import { CITIES } from "./typesCity";



type Props = {
  basePath?: string; 
  value?: string; 
  onChange?: (areaValue: string) => void;
  navigateOnChange?: boolean;
};

export  function CityTabs({
  basePath = "/vacancies",
  value,
  onChange,
  navigateOnChange = true,
}: Props) {
  const navigate = useNavigate();
  const { city } = useParams<{ city?: string }>();
  const location = useLocation();

  const active = useMemo(() => {
    if (value) {
      const foundByArea = CITIES.find((c) => c.areaValue === value);
      if (foundByArea) return foundByArea.slug;
      const foundBySlug = CITIES.find((c) => c.slug === value);
      if (foundBySlug) return foundBySlug.slug;
    }

    if (city && CITIES.some((c) => c.slug === city)) return city;

    const m = location.pathname.match(new RegExp(`^${basePath}/([^/]+)`));
    if (m && m[1] && CITIES.some((c) => c.slug === m[1])) return m[1];

    return CITIES[0].slug; 
  }, [value, city, location.pathname, basePath]);

  const handleChange = (val: string | null) => {
    if (!val) return;
    const found = CITIES.find((c) => c.slug === val);
    if (!found) return;

    if (navigateOnChange) {
      if (typeof onChange === "function") {
        try {
          onChange(found.areaValue);
        } catch {
            throw new Error 
        }
      }
      navigate(`${basePath}/${val}`);
    } else {
      if (typeof onChange === "function") {
        onChange(found.areaValue);
      }
    }
  };

  return (
    <div className={styles.root}>
      <Tabs value={active} onChange={handleChange}>
        <Tabs.List className={styles.tabList}>
          {CITIES.map((c) => (
            <Tabs.Tab key={c.slug} value={c.slug} className={styles.tab}>
              {c.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </div>
  );
}
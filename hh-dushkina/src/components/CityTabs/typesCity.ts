export type CityItem = {
  slug: string;      
  label: string;    
  areaValue: string; 
};

export const CITIES: CityItem[] = [
  { slug: "moscow", label: "Москва", areaValue: "1" },
  { slug: "petersburg", label: "Санкт-Петербург", areaValue: "2" },
];
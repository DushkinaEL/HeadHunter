export type Vacancy = {
  id: string;
  name: string;
  salary?: {
    from?: number;
    to?: number;
    currency?: string;
  };
  experience: {
    id: string;
    name: string;
  };
  schedule: {
    id: string;
    name: string;
  };
  employer: {
    name: string;
  };
  area: {
    name: string;
  };
  url: string;
  key_skills: { name: string }[];
  snippet?: {
    requirement?: string;
    responsibility?: string;
  };
  alternate_url: string;
};
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { mantineTheme } from './theme/mantineTheme';
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import { createHashRouter, redirect, RouterProvider } from 'react-router-dom';
import { VacancyPage, HomePage, ErrorPage, TabCityLayout, VacanciesListPage, vacanciesLoader,  } from './page';

const basename = import.meta.env.PROD ? '/HeadHunter' : '/';
const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/vacancies",
    element: <TabCityLayout />, 
    errorElement: <ErrorPage />,
    children: [
      { index: true, loader: async () => redirect("/vacancies/moscow") },
      {
        path: ":city",
        element: <VacanciesListPage />,
        loader: vacanciesLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },

  {
    path: "/vacancy/:id",
    element: <VacancyPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
];
const router = createHashRouter(routes, { basename }); 
export default function App() {
  return (
    <MantineProvider theme={mantineTheme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  );
}
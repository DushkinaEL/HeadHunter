import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { mantineTheme } from './theme/mantineTheme';
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { VacancyPage, HomePage, ErrorPage, TabCityLayout, VacanciesListPage, vacanciesLoader, AboutPage,  } from './page';
import { Layout } from './components';

  const routes = [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'vacancies',
        element: <TabCityLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <VacanciesListPage />, loader: vacanciesLoader },
          { path: ':city', element: <VacanciesListPage />, loader: vacanciesLoader, errorElement: <ErrorPage /> },
        ],
      },

      { path: 'vacancy/:id', element: <VacancyPage />, errorElement: <ErrorPage /> },

      { path: 'about', element: <AboutPage /> },

      { path: '*', element: <ErrorPage /> },
    ],
  },
];
const router = createHashRouter(routes); 
export default function App() {
  return (
    <MantineProvider theme={mantineTheme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  );
}
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { mantineTheme } from './theme/mantineTheme';
import HomePage from './page/HomePage';
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { VacancyPage } from './page/VacancyPage/VacancyPage';

function App() {
  return (
    <BrowserRouter basename="/HeadHunter">
    <MantineProvider theme={mantineTheme}>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vacancies" element={<HomePage />} />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
        </Routes>
      </Provider>
    </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
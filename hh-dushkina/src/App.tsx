import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { mantineTheme } from './theme/mantineTheme';
import HomePage from './page/HomePage';
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";

function App() {
  return (
    <MantineProvider theme={mantineTheme}>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </MantineProvider>
  );
}

export default App;
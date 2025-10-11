import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { mantineTheme } from './theme/mantineTheme';
import HomePage from './page/HomePage';

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
import { Provider } from 'react-redux';
import store from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <ThemedApp Component={Component} pageProps={pageProps} router={router} />
    </Provider>
  );
}

function ThemedApp({ Component, pageProps }: AppProps) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <button
        onClick={() => dispatch(toggleTheme())}
        className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded"
      >
        Toggle Theme
      </button>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

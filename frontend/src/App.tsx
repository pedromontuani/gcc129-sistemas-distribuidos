/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from './components/header/Header.tsx';
import DateContextProvider from './contexts/DateContext.tsx';
import Content from './components/content/Content.tsx';
import { useCallback, useLayoutEffect, useState } from 'react';
import { init as initializeDb } from './lib/NitroSqlite.ts';
import LoadingContextProvider from './contexts/LoadingContext.tsx';
import Loading from './components/loading/Loading.tsx';

function App() {
  const [isReady, setReady] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const init = useCallback(async () => {
    await initializeDb();
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    init();
  }, [init]);

  return isReady ? (
    <LoadingContextProvider>
      <DateContextProvider>
        <>
          <SafeAreaProvider style={styles.container}>
            <StatusBar
              backgroundColor="#D6D1E6"
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Header />
            <Content />
          </SafeAreaProvider>
          <Loading />
        </>
      </DateContextProvider>
    </LoadingContextProvider>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});

export default App;

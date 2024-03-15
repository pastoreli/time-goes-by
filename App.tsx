import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './src/store';
import { NotificationProvider } from './src/contexts/NotificationContext';
import { LightTheme, DarkTheme } from './src/themes';

const App = () => {
  const colorScheme = useColorScheme();
  console.log('colro: ', colorScheme);
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  const MyNavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.primary,
    },
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.gesture}>
        <ThemeProvider theme={theme}>
          <StoreProvider store={store}>
            <NavigationContainer theme={MyNavigationTheme}>
              <NotificationProvider>
                <Container>
                  <StatusBar backgroundColor="#C1C1C1" translucent />
                  <AppNavigator />
                </Container>
              </NotificationProvider>
            </NavigationContainer>
          </StoreProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.containerBg};
`;

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
});

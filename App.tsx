import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import notifee from '@notifee/react-native';
import AppNavigator from './src/navigations/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './src/store';
import { NotificationProvider } from './src/contexts/NotificationContext';
import { LightTheme, DarkTheme } from './src/themes';
import { handleNotificationInteraction } from './src/utils/notification';
import { BottomNavigatorRoutes } from './routes';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  const [initialScreen, setInialScreen] =
    useState<keyof BottomNavigatorRoutes>();

  const handleNotificationOpenApp = async () => {
    if (Platform.OS === 'android') {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification) {
        const { pressAction, notification } = initialNotification;
        const initalScreen = notification.data
          ?.screen as keyof BottomNavigatorRoutes;
        setInialScreen(initalScreen);
        if (pressAction.id === 'default') {
          await handleNotificationInteraction(initialNotification);
        }
      }
    }
  };

  useEffect(() => {
    handleNotificationOpenApp();
  }, []);

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
                  <AppNavigator initialScreen={initialScreen} />
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

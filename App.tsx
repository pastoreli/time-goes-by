import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styled, { ThemeProvider } from 'styled-components/native';
import { Host } from 'react-native-portalize';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';

// Theme
import { LightTheme, DarkTheme } from './src/themes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const colorScheme = useColorScheme();
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
          <Host>
            {/* <SafeAreaView> */}
            <NavigationContainer theme={MyNavigationTheme}>
              <Container>
                <StatusBar backgroundColor="#C1C1C1" translucent />
                <AppNavigator />
              </Container>
            </NavigationContainer>
            {/* </SafeAreaView> */}
          </Host>
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

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.containerBg};
`;

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
});

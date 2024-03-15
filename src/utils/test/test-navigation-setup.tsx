import React, { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import lightTheme from '../../themes/light';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { LightTheme } from '../../themes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: LightTheme.primary,
  },
};

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaProvider
      initialMetrics={{
        insets: { top: 10, left: 0, right: 0, bottom: 10 },
        frame: { height: 500, width: 300, x: 0, y: 0 },
      }}>
      <GestureHandlerRootView>
        <ThemeProvider theme={lightTheme}>
          <NavigationContainer theme={MyLightTheme}>
            {children}
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const customRender = (ui: React.ReactElement<any>, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };

const Stack = createNativeStackNavigator();

export const MockScreen: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Stack.Navigator initialRouteName="FirstScreen">
    <Stack.Screen name="FirstScreen" component={() => children} />
  </Stack.Navigator>
);

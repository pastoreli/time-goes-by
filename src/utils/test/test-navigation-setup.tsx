import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native';
import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import lightTheme from '../../themes/light';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { LightTheme } from '../../themes';
import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

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
          <Host>
            <SafeAreaView>
              <NavigationContainer theme={MyLightTheme}>
                {children}
              </NavigationContainer>
            </SafeAreaView>
          </Host>
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

const Stack = createStackNavigator();

export const MockScreen: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Stack.Navigator initialRouteName="FirstScreen">
    <Stack.Screen name="FirstScreen" component={() => children} />
  </Stack.Navigator>
);

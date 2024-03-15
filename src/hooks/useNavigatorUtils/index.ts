import { Platform, useColorScheme } from 'react-native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { BlurEffectTypes } from 'react-native-screens';

const useNavigatorUtils = () => {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const screenOptions: NativeStackNavigationOptions = {
    headerTintColor: theme.darken,
    headerTransparent: Platform.OS === 'ios',
    headerBlurEffect: colorScheme as BlurEffectTypes,
    contentStyle: {
      backgroundColor: theme.containerBg,
    },
  };

  return {
    screenOptions,
  };
};

export default useNavigatorUtils;

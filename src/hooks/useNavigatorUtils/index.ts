import { Platform } from 'react-native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

const useNavigatorUtils = () => {
  const theme = useTheme();

  const screenOptions: NativeStackNavigationOptions = {
    headerTintColor: theme.darken,
    headerTransparent: Platform.OS === 'ios',
    headerBlurEffect: 'regular',
    contentStyle: {
      backgroundColor: theme.containerBg,
    },
  };

  return {
    screenOptions,
  };
};

export default useNavigatorUtils;

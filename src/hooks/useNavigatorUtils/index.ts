import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

const useNavigatorUtils = () => {
  const theme = useTheme();

  const screenOptions: NativeStackNavigationOptions = {
    headerTintColor: theme.darken,
    headerStyle: {
      backgroundColor: theme.containerBg,
    },
    contentStyle: {
      backgroundColor: theme.containerBg,
    },
    headerShadowVisible: false,
  };

  return {
    screenOptions,
  };
};

export default useNavigatorUtils;

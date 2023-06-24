import { StackNavigationOptions } from '@react-navigation/stack';
import { Theme } from '../../interfaces/theme';

export const stackScreenOptions = (theme: Theme): StackNavigationOptions => ({
  headerTintColor: theme.darken,
  headerStyle: {
    backgroundColor: theme.containerBg,
    height: 50,
    shadowColor: theme.dividerColor,
  },
  headerTitleContainerStyle: {
    top: -50,
    height: 25,
  },
  headerRightContainerStyle: {
    top: -50,
    height: 25,
    right: 20,
  },
  headerLeftContainerStyle: {
    top: -50,
    height: 25,
    left: 20,
  },
  cardStyle: {
    backgroundColor: theme.containerBg,
  },
});

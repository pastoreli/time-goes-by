import React, { useCallback, useMemo } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import Text from '../Text';

export type TabBarProps = BottomTabBarProps & {
  show?: boolean;
};

const CONTAINER_HEIGHT = 65;

type TabItemProps = {
  testID?: string;
  icon: string;
  text: string;
  active?: boolean;
  onPress?: () => void;
};

const TabBar: React.FC<TabBarProps> = ({ navigation, state, show }) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const safeAreaInsets = useSafeAreaInsets();

  const tabHeight = useMemo(() => {
    let value = CONTAINER_HEIGHT + safeAreaInsets.bottom;
    if (safeAreaInsets.bottom > 0) {
      value -= 10;
    }
    return value;
  }, [safeAreaInsets]);

  const TabItem: React.FC<TabItemProps> = useCallback(
    ({ testID, icon, text, active, onPress }) => {
      return (
        <ItemContainer testID={testID} onPress={onPress}>
          <Icon
            name={icon}
            size={30}
            color={active ? theme.primary : theme.darken2}
          />
          <Text
            size={10}
            color={active ? theme.primary : theme.darken2}
            weight="semibold"
            style={styles.itemText}>
            {text}
          </Text>
        </ItemContainer>
      );
    },
    [theme],
  );

  if (!show) {
    return null;
  }

  return (
    <Container testID={testIds.TAB_BAR} height={tabHeight}>
      <ContainerShape height={tabHeight}>
        <BlurView
          style={styles.blurView}
          blurType={colorScheme === 'dark' ? 'dark' : 'light'}
          blurRadius={10}>
          <Content height={tabHeight}>
            {menus.map((item, index) => (
              <TabItem
                key={item.text}
                testID={`${testIds.TAB_BAR_ITEM}-${index}${
                  state.index === index ? '-active' : ''
                }`}
                icon={item.icon}
                text={item.text}
                active={state.index === index}
                onPress={() => navigation.navigate(item.screen)}
              />
            ))}
          </Content>
        </BlurView>
      </ContainerShape>
    </Container>
  );
};

const menus = [
  {
    text: 'Relógio',
    icon: 'web',
    screen: 'WorldClockTab',
  },
  {
    text: 'Alarmes',
    icon: 'alarm',
    screen: 'AlarmTab',
  },
  {
    text: 'Cronômetro',
    icon: 'timer-outline',
    screen: 'StopwatchTab',
  },
  {
    text: 'Temporizador',
    icon: 'av-timer',
    screen: 'TimerTab',
  },
];

export const useTabBar = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const tabHeight = useMemo(() => {
    let value = CONTAINER_HEIGHT + safeAreaInsets.bottom;
    if (safeAreaInsets.bottom > 0) {
      value -= 10;
    }
    return value;
  }, [safeAreaInsets]);

  return {
    tabBarDistance: tabHeight,
  };
};

export default TabBar;

const styles = StyleSheet.create({
  blurView: {
    flex: 1,
  },
  itemText: {
    marginTop: 2,
  },
});

const Container = styled.View<{ height: number }>`
  position: absolute;
  width: 100%;
  height: ${({ height }) => `${height}px`};
  bottom: 0;
`;

const ContainerShape = styled.View<{ height: number }>`
  flex-direction: row;
  align-items: center;
  height: ${({ height }) => `${height}px`};
  padding-top: 1px;
`;

const Content = styled.View<{ height: number }>`
  flex-direction: row;
  justify-content: space-around;
  height: ${({ height }) => `${height}px`};
  background-color: ${({ theme }) => `${theme.card.color}B3`};
  padding: 0 15px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.dividerColor};
`;

const ItemContainer = styled.TouchableOpacity`
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  flex: 1;
  height: 100%;
`;

export enum testIds {
  TAB_BAR = 'TabBar',
  TAB_BAR_ITEM = 'TabBar-item',
}

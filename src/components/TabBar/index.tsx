import React, { useCallback } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';

export type TabBarProps = BottomTabBarProps;

type TabItemProps = {
  testID?: string;
  icon: string;
  text: string;
  active?: boolean;
  onPress?: () => void;
};

const TabBar: React.FC<TabBarProps> = ({ navigation, state }) => {
  const theme = useTheme();
  const TabItem: React.FC<TabItemProps> = useCallback(
    ({ testID, icon, text, active, onPress }) => {
      return (
        <ItemContainer testID={testID} onPress={onPress}>
          <Icon
            name={icon}
            size={30}
            color={active ? theme.primary : theme.darken}
          />
          <Text size={10} color={active ? theme.primary : theme.darken}>
            {text}
          </Text>
        </ItemContainer>
      );
    },
    [theme],
  );

  return (
    <Container testID={testIds.TAB_BAR}>
      <TabItem
        testID={`${testIds.TAB_BAR_ITEM}-1${
          state.index === 0 ? '-active' : ''
        }`}
        icon="web"
        text="World Clock"
        active={state.index === 0}
        onPress={() => navigation.navigate('WorldClockTab')}
      />
      <TabItem
        testID={`${testIds.TAB_BAR_ITEM}-2${
          state.index === 1 ? '-active' : ''
        }`}
        icon="alarm"
        text="Alarm"
        active={state.index === 1}
        onPress={() => navigation.navigate('AlarmTab')}
      />
      <TabItem
        testID={`${testIds.TAB_BAR_ITEM}-3${
          state.index === 2 ? '-active' : ''
        }`}
        icon="timer-outline"
        text="Stopwatch"
        active={state.index === 2}
        onPress={() => navigation.navigate('StopwatchTab')}
      />
      <TabItem
        testID={`${testIds.TAB_BAR_ITEM}-4${
          state.index === 3 ? '-active' : ''
        }`}
        icon="av-timer"
        text="Timer"
        active={state.index === 3}
        onPress={() => navigation.navigate('TimerTab')}
      />
    </Container>
  );
};

export default TabBar;

const Container = styled.View`
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  padding-bottom: 5px;
  background-color: ${({ theme }) => theme.containerBg};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.dividerColor};
  height: 60px;
`;

const ItemContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  margin: 0 5px;
  padding-top: 10px;
`;

export enum testIds {
  TAB_BAR = 'TabBar',
  TAB_BAR_ITEM = 'TabBar-item',
}

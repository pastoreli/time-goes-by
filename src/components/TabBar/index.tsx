import React, { useCallback } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import Text from '../Text';

export type TabBarProps = BottomTabBarProps;

const CONTAINER_HEIGHT = 70;

type TabItemProps = {
  testID?: string;
  icon: string;
  text: string;
  active?: boolean;
  onPress?: () => void;
};

const TabBar: React.FC<TabBarProps> = ({ navigation, state }) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const safeAreaInsets = useSafeAreaInsets();

  const TabItem: React.FC<TabItemProps> = useCallback(
    ({ testID, icon, text, active, onPress }) => {
      return (
        <ItemContainer testID={testID} onPress={onPress}>
          <Icon
            name={icon}
            size={26}
            color={active ? theme.primary : theme.darken2}
          />
          <Text
            size={10}
            color={active ? theme.primary : theme.darken2}
            weight="medium"
            style={styles.itemText}>
            {text}
          </Text>
        </ItemContainer>
      );
    },
    [theme],
  );

  return (
    <Container testID={testIds.TAB_BAR} bottom={safeAreaInsets.bottom}>
      <ContainerShadow>
        <ContainerShape>
          <BlurView
            style={styles.blurView}
            blurType={colorScheme === 'dark' ? 'dark' : 'light'}
            blurRadius={10}>
            <Content>
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
            </Content>
          </BlurView>
        </ContainerShape>
      </ContainerShadow>
    </Container>
  );
};

export const useTabBar = () => {
  const safeAreaInsets = useSafeAreaInsets();

  return {
    tabBarDistance: CONTAINER_HEIGHT + safeAreaInsets.bottom,
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

const Container = styled.View<{ bottom: number }>`
  position: absolute;
  width: 100%;
  height: 70px;
  bottom: ${({ bottom }) => `${bottom - 5}px`};
  padding-left: 20px;
  padding-right: 20px;
`;

const ContainerShadow = styled.View`
  shadow-opacity: 0.75;
  shadow-radius: 8px;
  shadow-color: ${({ theme }) => theme.shadowColor};
  shadow-offset: 0px 2px;
`;

const ContainerShape = styled.View`
  flex-direction: row;
  align-items: center;
  height: 70px;
  border-radius: 50px;
  overflow: hidden;
`;

const Content = styled.View`
  flex-direction: row;
  justify-content: space-around;
  height: 70px;
  background-color: ${({ theme }) => `${theme.card.color}B3`};
  padding: 0 20px;
`;

const ItemContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
`;

export enum testIds {
  TAB_BAR = 'TabBar',
  TAB_BAR_ITEM = 'TabBar-item',
}

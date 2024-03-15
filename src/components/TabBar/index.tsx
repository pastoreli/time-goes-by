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
      </ContainerShadow>
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

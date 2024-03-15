import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { Text, EmptyInfo } from '../../../components';
import { useWorldClock } from '../../../hooks';

// Sections
import { WorldClockList } from '../sections';
import { WorldClockNavigatorRoutes } from '../../../../routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTabBar } from '../../../components/TabBar';

type ScreenNavigationProp = NavigationProp<
  WorldClockNavigatorRoutes,
  'WorldClock'
>;

const WorldClock = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const theme = useTheme();
  const screenIsFocused = useIsFocused();
  const safeAreaInsets = useSafeAreaInsets();
  const { tabBarDistance } = useTabBar();
  const {
    worldClockList,
    worldClockEditMode,
    updateWorldClockList,
    deleteWorldClockItem,
    toogleEditMode,
    refetchWorldClockList,
  } = useWorldClock();

  useEffect(() => {
    if (screenIsFocused) {
      refetchWorldClockList();
    }
  }, [screenIsFocused]);

  const handleGoToAdd = useCallback(() => {
    if (worldClockEditMode) {
      toogleEditMode();
    }
    navigation.navigate('WorldClockChooseModal');
  }, [navigation, worldClockEditMode]);

  const RightNavButton = useCallback(
    () => (
      <Pressable testID={testIds.NAV_RIGHT_BUTTON} onPress={handleGoToAdd}>
        <Icon name="plus" size={30} color={theme.primary} />
      </Pressable>
    ),
    [theme.primary, handleGoToAdd],
  );

  const LeftNavButton = useCallback(
    () => (
      <Pressable testID={testIds.NAV_LEFT_BUTTON} onPress={toogleEditMode}>
        <Text size={18} weight="medium" color={theme.primary}>
          {worldClockEditMode ? 'Concluir' : 'Editar'}
        </Text>
      </Pressable>
    ),
    [theme.primary, toogleEditMode, worldClockEditMode],
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: worldClockList.length > 0 ? LeftNavButton : undefined,
      headerRight: worldClockList.length > 0 ? RightNavButton : undefined,
    });
  }, [LeftNavButton, RightNavButton, navigation, worldClockList]);

  useEffect(() => {
    if (worldClockList.length < 1 && worldClockEditMode) {
      toogleEditMode();
    }
  }, [worldClockList, worldClockEditMode]);

  if (worldClockList.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: safeAreaInsets.top + 60,
          paddingBottom: tabBarDistance + 15,
        }}>
        <EmptyInfo
          icon="web"
          title="Você ainda não escolheu um relógio!"
          actionText="Adicionar"
          onActionPress={handleGoToAdd}
        />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.list}>
          <WorldClockList
            list={worldClockList}
            editMode={worldClockEditMode}
            onListChange={updateWorldClockList}
            onDelete={deleteWorldClockItem}
          />
        </View>
      </View>
    </>
  );
};

export default WorldClock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export enum testIds {
  NAV_LEFT_BUTTON = 'WorldClock-nav-left-button',
  NAV_RIGHT_BUTTON = 'WorldClock-nav-right-button',
}

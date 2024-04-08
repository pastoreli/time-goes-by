import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Platform,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import { Text, EmptyInfo } from '../../../components';
import { useWorldClock } from '../../../hooks';
import { WorldClockList } from '../sections';
import { WorldClockNavigatorRoutes } from '../../../../routes';
import { useTabBar } from '../../../components/TabBar';
import { StatusBar } from 'expo-status-bar';

type ScreenNavigationProp = NavigationProp<
  WorldClockNavigatorRoutes,
  'WorldClock'
>;

const WorldClock = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const theme = useTheme();
  const screenIsFocused = useIsFocused();
  const { tabBarDistance } = useTabBar();
  const colorScheme = useColorScheme();
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

  const RightNavButton = useCallback(() => {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.androidButtons}>
          {!worldClockEditMode && (
            <Pressable testID={testIds.NAV_ADD_BUTTON} onPress={handleGoToAdd}>
              <Icon name="plus" size={30} color={theme.darken} />
            </Pressable>
          )}
          <Pressable testID={testIds.NAV_EDIT_BUTTON} onPress={toogleEditMode}>
            <Icon
              name={worldClockEditMode ? 'check' : 'pencil-outline'}
              size={worldClockEditMode ? 30 : 26}
              color={theme.darken}
            />
          </Pressable>
        </View>
      );
    }

    return (
      <Pressable testID={testIds.NAV_ADD_BUTTON} onPress={handleGoToAdd}>
        <Icon name="plus" size={30} color={theme.primary} />
      </Pressable>
    );
  }, [theme, handleGoToAdd]);

  const LeftNavButton = useCallback(() => {
    if (Platform.OS === 'android') {
      return null;
    }

    return (
      <Pressable testID={testIds.NAV_EDIT_BUTTON} onPress={toogleEditMode}>
        <Text size={18} weight="medium" color={theme.primary}>
          {worldClockEditMode ? 'Concluir' : 'Editar'}
        </Text>
      </Pressable>
    );
  }, [theme.primary, toogleEditMode, worldClockEditMode]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: worldClockList.length > 0 ? LeftNavButton : null,
      headerRight: worldClockList.length > 0 ? RightNavButton : null,
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
          ...styles.emptyContainer,
          paddingBottom: tabBarDistance + 15,
        }}>
        <StatusBar
          backgroundColor={theme.containerBg}
          translucent
          style={colorScheme === 'light' ? 'dark' : 'light'}
        />
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
        <StatusBar
          backgroundColor={theme.containerBg}
          translucent
          style={colorScheme === 'light' ? 'dark' : 'light'}
        />
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
  androidButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 15,
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
  },
});

export enum testIds {
  NAV_EDIT_BUTTON = 'WorldClock-nav-left-button',
  NAV_ADD_BUTTON = 'WorldClock-nav-right-button',
}

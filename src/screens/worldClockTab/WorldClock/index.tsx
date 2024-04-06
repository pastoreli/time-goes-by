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
import { FloatingAction, IActionProps } from 'react-native-floating-action';
import { Text, EmptyInfo } from '../../../components';
import { useWorldClock } from '../../../hooks';
import { WorldClockList } from '../sections';
import { WorldClockNavigatorRoutes } from '../../../../routes';
import { useTabBar } from '../../../components/TabBar';
import { StatusBar } from 'expo-status-bar';

enum fabIds {
  BT_ADD = 'btn_add',
  BT_EDIT = 'btn_edit',
}

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

  const fabActions: IActionProps[] = [
    {
      icon: <Icon name="plus" size={25} color={theme.lighthen} />,
      name: fabIds.BT_ADD,
      color: theme.primary,
    },
    {
      icon: <Icon name="pencil-outline" size={22} color={theme.lighthen} />,
      name: fabIds.BT_EDIT,
      color: theme.primary,
    },
  ];

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

  const handleFabActions = (id: fabIds) => {
    if (id === fabIds.BT_ADD) {
      handleGoToAdd();
    } else {
      toogleEditMode();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft:
        worldClockList.length > 0 && Platform.OS === 'ios'
          ? LeftNavButton
          : undefined,
      headerRight:
        worldClockList.length > 0 && Platform.OS === 'ios'
          ? RightNavButton
          : undefined,
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
        {Platform.OS === 'android' && (
          <FloatingAction
            actions={worldClockEditMode ? undefined : fabActions}
            color={theme.primary}
            buttonSize={60}
            distanceToEdge={{
              vertical: tabBarDistance + 20,
              horizontal: worldClockEditMode ? 0 : 30,
            }}
            position={worldClockEditMode ? 'center' : 'right'}
            floatingIcon={
              worldClockEditMode ? (
                <Icon name="check" size={30} color="#FFFFFF" />
              ) : undefined
            }
            onPressMain={() =>
              worldClockEditMode ? toogleEditMode() : undefined
            }
            onPressItem={id =>
              worldClockEditMode ? undefined : handleFabActions(id as fabIds)
            }
          />
        )}
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
  emptyContainer: {
    flex: 1,
  },
});

export enum testIds {
  NAV_LEFT_BUTTON = 'WorldClock-nav-left-button',
  NAV_RIGHT_BUTTON = 'WorldClock-nav-right-button',
}

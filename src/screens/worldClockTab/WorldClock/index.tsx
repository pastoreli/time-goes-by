import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Text } from '../../../components';
import { useWorldClockStorage } from '../../../hooks';

// Sections
import { WorldClockChooseList, WorldClockList } from '../sections';

const WorldClock = () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const { worldClockList: storageWorldClockList, setWorldClockItem } =
    useWorldClockStorage();

  const modalizeRef = useRef<Modalize>(null);

  const RightNavButton = useCallback(
    () => (
      <Pressable
        testID={testIds.NAV_RIGHT_BUTTON}
        onPress={() => modalizeRef.current?.open()}>
        <Icon name="plus" size={30} color={theme.textColor.darken} />
      </Pressable>
    ),
    [theme],
  );

  const handleSelectedTimeZone = (timeZone: string) => {
    setWorldClockItem(timeZone);
    modalizeRef.current?.close();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: RightNavButton,
    });
  }, [RightNavButton, navigation]);

  return (
    <>
      <View>
        <View style={styles.list}>
          <WorldClockList list={storageWorldClockList} />
        </View>
      </View>
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalTopOffset={safeAreaInsets.top}
          modalStyle={{
            ...styles.modalize,
            backgroundColor: theme.containerBg,
          }}
          handlePosition="inside">
          <WorldClockChooseList onChoose={handleSelectedTimeZone} />
        </Modalize>
      </Portal>
    </>
  );
};

export default WorldClock;

const styles = StyleSheet.create({
  modalize: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  list: {
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export enum testIds {
  NAV_RIGHT_BUTTON = 'WorldClock-nav-right-button',
}

import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { ModalizeSearchHeader, Text } from '../../../components';
import { useWorldClockStorage } from '../../../hooks';
import { timeZoneList } from '../../../utils/lists/timeZone';
import { searchHandler } from '../../../utils/stringUtils';

// Sections
import { WorldClockChooseList, WorldClockList } from '../sections';

const searchTimeZone =
  (search: string) =>
  (timeZone: string): boolean =>
    searchHandler(timeZone, search);

const WorldClock = () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();
  const {
    worldClockList: storageWorldClockList,
    worldClockEditMode,
    setWorldClockItem,
    updateWorldClockList,
    deleteWorldClockItem,
    toogleEditMode,
  } = useWorldClockStorage();

  const modalizeRef = useRef<Modalize>(null);

  const [search, setSeach] = useState('');

  const list = useMemo(() => {
    return timeZoneList.filter(searchTimeZone(search));
  }, [search]);

  const handleOpenTimeChoose = useCallback(() => {
    modalizeRef.current?.open();
    if (worldClockEditMode) {
      toogleEditMode();
    }
  }, [toogleEditMode, worldClockEditMode]);

  const RightNavButton = useCallback(
    () => (
      <Pressable
        testID={testIds.NAV_RIGHT_BUTTON}
        onPress={handleOpenTimeChoose}>
        <Icon name="plus" size={30} color={theme.primary} />
      </Pressable>
    ),
    [handleOpenTimeChoose, theme.primary],
  );

  const LeftNavButton = useCallback(
    () => (
      <Pressable testID={testIds.NAV_LEFT_BUTTON} onPress={toogleEditMode}>
        <Text size={18} weight="medium" color={theme.primary}>
          {worldClockEditMode ? 'Done' : 'Edit'}
        </Text>
      </Pressable>
    ),
    [theme.primary, toogleEditMode, worldClockEditMode],
  );

  const handleSelectedTimeZone = (timeZone: string) => {
    setWorldClockItem(timeZone);
    modalizeRef.current?.close();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: LeftNavButton,
      headerRight: RightNavButton,
    });
  }, [LeftNavButton, RightNavButton, navigation]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.list}>
          <WorldClockList
            list={storageWorldClockList}
            editMode={worldClockEditMode}
            onListChange={updateWorldClockList}
            onDelete={deleteWorldClockItem}
          />
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
          handleStyle={{ backgroundColor: theme.lighthen3 }}
          handlePosition="inside"
          HeaderComponent={
            <ModalizeSearchHeader
              title="Choose a City"
              search={search}
              onSearchChange={setSeach}
            />
          }
          onClosed={() => setSeach('')}>
          <WorldClockChooseList list={list} onChoose={handleSelectedTimeZone} />
        </Modalize>
      </Portal>
    </>
  );
};

export default WorldClock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalize: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  modalizeHeader: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  list: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export enum testIds {
  NAV_LEFT_BUTTON = 'WorldClock-nav-left-button',
  NAV_RIGHT_BUTTON = 'WorldClock-nav-right-button',
}

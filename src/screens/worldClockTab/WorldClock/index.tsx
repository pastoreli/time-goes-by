import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Text } from '../../../components';

// Sections
import { WorldClockList } from '../sections';

const WorldClock = () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          testID={testIds.NAV_RIGHT_BUTTON}
          onPress={() => modalizeRef.current?.open()}>
          <Icon name="plus" size={30} color={theme.textColor.darken} />
        </Pressable>
      ),
    });
  }, [navigation, theme]);

  return (
    <>
      <View>
        <Text size={28} textAlign="center" margin="40px">
          World Clock
        </Text>
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
          <WorldClockList onChoose={() => {}} />
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
});

export enum testIds {
  NAV_RIGHT_BUTTON = 'WorldClock-nav-right-button',
}

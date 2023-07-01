import React from 'react';
import {
  TouchableOpacityProps,
  Pressable,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';
import styled from 'styled-components/native';

const PressableArea: React.FC<TouchableOpacityProps> = ({
  children,
  ...props
}) => (
  <View
    testID={
      Platform.OS === 'ios' ? testIds.IOS_PRESSABLE : testIds.ANDROID_PRESSABLE
    }>
    {Platform.OS === 'ios' ? (
      <TouchableOpacity {...props}>{children}</TouchableOpacity>
    ) : (
      <MyPressable {...props}>{children}</MyPressable>
    )}
  </View>
);

export default PressableArea;

const MyPressable = styled(Pressable).attrs(({ theme }) => ({
  android_ripple: {
    borderless: false,
    color: theme.containerBg,
  },
}))``;

export enum testIds {
  IOS_PRESSABLE = 'PressableArea-IOS-pressable',
  ANDROID_PRESSABLE = 'PressableArea-Android-pressable',
}

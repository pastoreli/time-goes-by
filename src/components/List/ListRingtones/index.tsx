import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BlockButton from '../../BlockButton';
import { alarmSounds } from '../../../utils/lists/sound';
import { Sound } from '../../../interfaces/sound';
import { useSound } from '../../../hooks';

export type ListRingtonesProps = {
  testID?: string;
  value: Sound;
  onSelect?: (value: Sound) => void;
};

const ListRingtones: React.FC<ListRingtonesProps> = ({
  testID,
  value,
  onSelect,
}) => {
  const theme = useTheme();
  const { playSound, stopSound } = useSound();

  const handlePlaySound = (data: Sound) => {
    onSelect?.(data);
    playSound(data.file);
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, [stopSound]);

  return (
    <View testID={testID} style={styles.container}>
      {alarmSounds.map((item, index) => (
        <BlockButton
          testID={`${testID}-${testIds.LIST_ITEM}-${index}`}
          key={item.name}
          onPress={() => handlePlaySound(item)}
          append={
            item.name === value.name ? (
              <Icon name="check" color={theme.success} size={22} />
            ) : (
              <></>
            )
          }>
          {item.name}
        </BlockButton>
      ))}
    </View>
  );
};

export default ListRingtones;

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
});

export enum testIds {
  LIST_ITEM = 'ListRingtones-item',
}

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BlockButton from '../../BlockButton';
import { weekDayList } from '../../../utils/lists/calendar';
import { WeekDay } from '../../../consts';

export type ListWeekProps = {
  testID?: string;
  value: WeekDay[];
  onSelect?: (value: WeekDay) => void;
};

const ListWeek: React.FC<ListWeekProps> = ({ testID, value, onSelect }) => {
  const theme = useTheme();

  return (
    <View testID={testID} style={styles.container}>
      {weekDayList.map((item, index) => (
        <BlockButton
          testID={`${testID}-${testIds.LIST_ITEM}-${index}`}
          key={item.value}
          append={
            value.includes(item.value) ? (
              <Icon
                testID={`${testID}-${testIds.LIST_ITEM_CHECK}-${index}`}
                name="check"
                color={theme.success}
                size={22}
              />
            ) : (
              <></>
            )
          }
          onPress={() => onSelect?.(item.value)}>
          Tod{index > 4 ? 'o' : 'a'} {item.text.toLowerCase()}
        </BlockButton>
      ))}
    </View>
  );
};

export default ListWeek;

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
});

export enum testIds {
  LIST_ITEM = 'ListWeek-item',
  LIST_ITEM_CHECK = 'ListWeek-item-check',
}

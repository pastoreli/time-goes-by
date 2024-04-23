import React, { Fragment, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { useTheme } from 'styled-components/native';
import Text from '../Text';

export type ClockProps = {
  testID?: string;
  itemsList: Array<number[]>;
  itemsIndicators?: string[];
  values: number[];
  onChange: (value: number, listIndex: number) => void;
};

const Clock: React.FC<ClockProps> = ({
  testID,
  itemsList,
  itemsIndicators,
  values,
  onChange,
}) => {
  const theme = useTheme();

  if (itemsList.length > 3) {
    throw new Error(
      'Clock component only accepts itemList of sizes equal to or less than size 3',
    );
  }

  const itemStyles = useMemo(() => {
    if (itemsList.length === 3) {
      return [styles.begin, styles.middle, styles.end];
    }

    if (itemsList.length === 2) {
      return [styles.begin, styles.end];
    }

    return [styles.middle];
  }, [itemsList]);

  return (
    <View testID={testID} style={styles.container}>
      {itemsList.map((item, index) => (
        <Fragment key={`item-${index}`}>
          <ScrollPicker
            testID={`${testID}-${testIds.CLOCK_PICKER}-${index}`}
            dataSource={item}
            selectedIndex={values[index]}
            renderItem={(data, _, isSelected) => (
              <View
                testID={`${testID}-${testIds.CLOCK_PIKER_ITEM_VALUE}-${index}-${data}${isSelected ? '-selected' : ''}`}
                style={{ ...styles.pickerItem, ...itemStyles[index] }}>
                <Text
                  size={36}
                  color={isSelected ? theme.darken : theme.darken1}
                  weight={isSelected ? 'bold' : 'medium'}>
                  {data}
                </Text>
                <Text
                  size={20}
                  color={isSelected ? theme.darken : theme.darken1}
                  weight={'medium'}
                  textMargin="0 0 4px 2px">
                  {itemsIndicators?.[index]}
                </Text>
              </View>
            )}
            wrapperHeight={300}
            wrapperBackground="transparent"
            itemHeight={100}
            highlightColor={theme.lighthen3}
            highlightBorderWidth={2}
            onValueChange={data => onChange(data, index)}
          />
          {index < itemsList.length - 1 && (
            <View style={styles.dotsContainer}>
              <View style={styles.dotsItem}>
                <Text size={40} color={theme.darken1}>
                  :
                </Text>
              </View>
              <View
                style={{
                  ...styles.dotsItem,
                  ...styles.dotsItemBorder,
                  borderColor: theme.lighthen3,
                }}>
                <Text size={40}>:</Text>
              </View>
              <View style={styles.dotsItem}>
                <Text size={40} color={theme.darken1}>
                  :
                </Text>
              </View>
            </View>
          )}
        </Fragment>
      ))}
    </View>
  );
};

export default Clock;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  begin: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingRight: 30,
  },
  middle: {
    width: '100%',
    justifyContent: 'center',
  },
  end: {
    width: '100%',
    paddingLeft: 30,
  },
  dotsContainer: {
    height: 300,
    justifyContent: 'space-between',
  },
  dotsItem: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 6,
  },
  dotsItemBorder: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
});

export enum testIds {
  CLOCK_PICKER = 'Clock-picker',
  CLOCK_PIKER_ITEM_VALUE = 'Clock-picker-item-value',
}

import React, { Fragment, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { useTheme } from 'styled-components/native';
import Text from '../Text';

export type ClockProps = {
  itemsList: Array<number[]>;
  values: number[];
  onChange: (value: number, listIndex: number) => void;
};

const Clock: React.FC<ClockProps> = ({ itemsList, values, onChange }) => {
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
    <View style={styles.container}>
      {itemsList.map((item, index) => (
        <Fragment key={`item-${index}`}>
          <ScrollPicker
            dataSource={item}
            selectedIndex={values[index]}
            renderItem={(data, _, isSelected) => (
              <View style={itemStyles[index]}>
                <Text
                  size={36}
                  color={isSelected ? theme.darken : theme.darken1}
                  weight={isSelected ? 'bold' : 'medium'}>
                  {data}
                </Text>
              </View>
            )}
            wrapperHeight={300}
            wrapperBackground="transparent"
            itemHeight={100}
            highlightColor={theme.primary}
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
                  borderColor: theme.primary,
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
  begin: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 30,
  },
  middle: {
    width: '100%',
    alignItems: 'center',
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

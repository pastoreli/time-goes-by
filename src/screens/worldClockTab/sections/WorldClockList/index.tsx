import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { trigger, HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { Text } from '../../../../components';
import styled, { useTheme } from 'styled-components/native';
import dateUtil from '../../../../utils/date';
import { timeZoneToDisplaySimpleText } from '../../../../utils/stringUtils';
import { useTabBar } from '../../../../components/TabBar';

export type WorldClockListProps = {
  list: string[];
  editMode?: boolean;
  onListChange?: (lits: string[]) => void;
  onDelete?: (item: string) => void;
};

const WorldClockList: React.FC<WorldClockListProps> = ({
  list,
  editMode = false,
  onDelete,
  onListChange,
}) => {
  const theme = useTheme();
  const { tabBarDistance } = useTabBar();
  const safeAreaInsets = useSafeAreaInsets();

  const [date, setDate] = useState(dateUtil());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dateUtil());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getDayDiffText = (timeZone: string) => {
    const dayLabels = ['Yesterday', 'Today', 'Tommorow'];
    const dayDiff = date.tz(timeZone).dayOfYear() - date.dayOfYear();

    let hours = date.diff(date.tz(timeZone, true), 'hours').toString();

    if (parseInt(hours, 10) >= 0) {
      hours = `+${hours}`;
    }

    return `${dayLabels[dayDiff + 1]}, ${hours}HRS`;
  };

  const RenderListItem: React.FC<RenderItemParams<string>> = ({
    item,
    drag,
  }) => (
    <ListItem testID={testIds.LIST_ITEM} key={item}>
      <View style={styles.rightItem}>
        {editMode && (
          <MinusButton
            testID={testIds.DELETE_BUTON}
            onPress={() => onDelete && onDelete(item)}>
            <Icon name="minus" size={22} color="white" />
          </MinusButton>
        )}
        <View>
          <Text size={16} color={theme.darken2}>
            {getDayDiffText(item)}
          </Text>
          <Text size={24} weight="medium">
            {timeZoneToDisplaySimpleText(item)}
          </Text>
        </View>
      </View>
      <View>
        {editMode ? (
          <TouchableOpacity
            testID={testIds.ORGANIZER_BUTTON}
            style={styles.queueOrganizer}
            onLongPress={drag}>
            <Icon name="menu" size={30} color={theme.lighthen2} />
          </TouchableOpacity>
        ) : (
          <Text size={56}>
            {date.tz(item).format('HH:mm').replace(/^0+/, '')}
          </Text>
        )}
      </View>
    </ListItem>
  );

  return (
    <DraggableFlatList
      testID={testIds.LIST}
      data={list}
      keyExtractor={item => item}
      renderItem={RenderListItem}
      containerStyle={styles.fillHeight}
      contentContainerStyle={{
        ...styles.listContainer,
        paddingTop: safeAreaInsets.top + 60,
        paddingBottom: tabBarDistance + 15,
      }}
      ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
      onDragBegin={() => trigger(HapticFeedbackTypes.impactMedium)}
      onDragEnd={({ data }) => onListChange && onListChange(data)}
      onRelease={() => trigger(HapticFeedbackTypes.impactMedium)}
    />
  );
};

export default WorldClockList;

const styles = StyleSheet.create({
  fillHeight: {
    flex: 1,
  },
  listContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  listSeparator: {
    height: 15,
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueOrganizer: {
    marginRight: 20,
  },
});

const ListItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px
  height: 110px;
  background-color: ${({ theme }) => theme.card.color};
  border-radius: 20px;
  shadow-opacity: 0.4;
  shadow-radius: 4px;
  shadow-color: ${({ theme }) => theme.shadowColor};
  shadow-offset: 0px 2px;
  /* background-color: ${({ theme }) => `${theme.containerBg}E6`}; */
`;

const MinusButton = styled.TouchableOpacity`
  padding-top: 0.5px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.danger};
  width: 22px;
  height: 22px;
  border-radius: 50px;
`;

export enum testIds {
  LIST = 'WorldClockList',
  DELETE_BUTON = 'WorldClockList-delete-button',
  LIST_ITEM = 'WorldClockList-list-item',
  ORGANIZER_BUTTON = 'WorldClockList-organizer-button',
}

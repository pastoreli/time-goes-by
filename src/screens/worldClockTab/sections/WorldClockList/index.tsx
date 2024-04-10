import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { trigger, HapticFeedbackTypes } from 'react-native-haptic-feedback';
import { Text, Card } from '../../../../components';
import styled, { useTheme } from 'styled-components/native';
import dateUtil from '../../../../utils/date';
import { timeZoneToDisplaySimpleText } from '../../../../utils/stringUtils';
import { useTabBar } from '../../../../components/TabBar';
import { WorldClock } from '../../../../interfaces/worldClock';

export type WorldClockListProps = {
  list: WorldClock[];
  editMode?: boolean;
  onListChange?: (lits: WorldClock[]) => void;
  onDelete?: (item: WorldClock) => void;
};

const WorldClockList: React.FC<WorldClockListProps> = ({
  list,
  editMode = false,
  onDelete,
  onListChange,
}) => {
  const theme = useTheme();
  const { tabBarDistance } = useTabBar();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getDayDiffText = (timeZone: string) => {
    const dayLabels = ['Ontem', 'Hoje', 'Amanhã'];
    const timezoneDate = dateUtil.utcToZonedTime(date.valueOf(), timeZone);
    const dayDiff =
      dateUtil.getDayOfYear(timezoneDate) - dateUtil.getDayOfYear(date);

    let hours = dateUtil.differenceInHours(timezoneDate, date).toString();

    if (parseInt(hours, 10) >= 0) {
      hours = `+${hours}`;
    }

    return `${dayLabels[dayDiff + 1]}, ${hours}HRS`;
  };

  const RenderListItem: React.FC<RenderItemParams<WorldClock>> = ({
    item,
    drag,
  }) => (
    <Card testID={testIds.LIST_ITEM} key={item.timeZone}>
      <View style={styles.rightItem}>
        {editMode && (
          <MinusButton
            testID={testIds.DELETE_BUTON}
            onPress={() => onDelete && onDelete(item)}>
            <MinusButtonContent>
              <Icon name="minus" size={22} color="white" />
            </MinusButtonContent>
          </MinusButton>
        )}
        <View>
          <Text size={16} color={theme.darken2}>
            {getDayDiffText(item.timeZone)}
          </Text>
          <Text size={24} weight="medium">
            {timeZoneToDisplaySimpleText(item.text)}
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
            {dateUtil.formatInTimeZone(date.valueOf(), item.timeZone, 'H:mm')}
          </Text>
        )}
      </View>
    </Card>
  );

  return (
    <DraggableFlatList
      testID={testIds.LIST}
      data={list}
      keyExtractor={item => item.timeZone}
      renderItem={RenderListItem}
      containerStyle={styles.fillHeight}
      contentContainerStyle={{
        ...styles.listContainer,
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
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listSeparator: {
    height: 15,
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginRight: 40,
  },
  queueOrganizer: {
    marginRight: 20,
  },
});

const MinusButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  padding-top: 0.5px;
  margin-right: 20px;
  width: 22px;
  height: 80px;
  border-radius: 50px;
`;

const MinusButtonContent = styled.View`
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

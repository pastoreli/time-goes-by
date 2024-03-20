import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const safeAreaInsets = useSafeAreaInsets();

  const [date, setDate] = useState(dateUtil());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dateUtil());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getDayDiffText = (timeZone: string) => {
    const dayLabels = ['Ontem', 'Hoje', 'Amanhã'];
    const dayDiff = date.tz(timeZone).dayOfYear() - date.dayOfYear();

    let hours = date.diff(date.tz(timeZone, true), 'hours').toString();

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
            <Icon name="minus" size={22} color="white" />
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
          <Text size={56}>{date.tz(item.timeZone).format('H:mm')}</Text>
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
  },
  queueOrganizer: {
    marginRight: 20,
  },
});

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

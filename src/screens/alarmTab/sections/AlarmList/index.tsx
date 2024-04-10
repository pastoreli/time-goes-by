import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { Alarm } from '../../../../interfaces/alarm';
import { useTabBar } from '../../../../components/TabBar';
import { Card, Switch, Text } from '../../../../components';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { formatSelectedWeekList } from '../../../../utils/stringUtils';

export type AlarmListProps = {
  list: Alarm[];
  editMode?: boolean;
  onListChange?: (lits: Alarm[]) => void;
  onDelete?: (alarm: Alarm) => void;
  onToggleActiveAlarm?: (alarm: Alarm) => void;
  onSelect?: (alarm: Alarm) => void;
};

const AlarmList: React.FC<AlarmListProps> = ({
  list,
  editMode,
  onDelete,
  onListChange,
  onToggleActiveAlarm,
  onSelect,
}) => {
  const theme = useTheme();
  const { tabBarDistance } = useTabBar();

  const RenderListItem: React.FC<RenderItemParams<Alarm>> = ({
    item,
    drag,
  }) => {
    const repeatText = formatSelectedWeekList(item.repeat, true);
    return (
      <TouchableOpacity
        testID={testIds.LIST_ITEM}
        onPress={() => onSelect?.(item)}>
        <Card>
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
              <Text size={40} weight="medium" color={theme.darken}>
                {item.hour}:{item.minute.toString().padStart(2, '0')}
              </Text>
              <Text size={14} weight="medium" color={theme.darken2}>
                {item.name}
                {repeatText ? `, ${repeatText} ` : ''}
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
              <Switch
                value={item.active}
                onValueChange={() => onToggleActiveAlarm?.(item)}
              />
            )}
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <DraggableFlatList
      testID={testIds.LIST}
      data={list}
      keyExtractor={item => item.id}
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

export default AlarmList;

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
  LIST = 'AlarmList',
  DELETE_BUTON = 'AlarmList-delete-button',
  LIST_ITEM = 'AlarmList-list-item',
  ORGANIZER_BUTTON = 'AlarmList-organizer-button',
}

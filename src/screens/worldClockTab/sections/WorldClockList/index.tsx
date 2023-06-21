import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../../components';
import styled, { useTheme } from 'styled-components/native';
import dateUtil from '../../../../utils/date';
import { timeZoneToDisplaySimpleText } from '../../../../utils/stringUtils';

export type WorldClockListProps = {
  list: string[];
};

const WorldClockList: React.FC<WorldClockListProps> = ({ list }) => {
  const theme = useTheme();

  const getDayDiffText = (timeZone: string) => {
    const dayLabels = ['Yesterday', 'Today', 'Tommorow'];
    const dayDiff =
      dateUtil().tz(timeZone).dayOfYear() - dateUtil().dayOfYear();

    let hours = dateUtil()
      .diff(dateUtil().tz(timeZone, true), 'hours')
      .toString();

    if (parseInt(hours, 10) >= 0) {
      hours = `+${hours}`;
    }

    return `${dayLabels[dayDiff + 1]}, ${hours}HRS`;
  };

  return (
    <View>
      {list.map(item => (
        <ListItem key={item}>
          <View>
            <Text size={16} color={theme.textColor.darken2}>
              {getDayDiffText(item)}
            </Text>
            <Text size={24} weight="medium">
              {timeZoneToDisplaySimpleText(item)}
            </Text>
          </View>
          <View>
            <Text size={56}>{dateUtil().tz(item).format('HH:mm')}</Text>
          </View>
        </ListItem>
      ))}
    </View>
  );
};

export default WorldClockList;

const ListItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.dividerColor};
`;

import React, { useMemo } from 'react';
import { PressableAndroidRippleConfig } from 'react-native';
import styled from 'styled-components/native';
import { Text, PressableArea } from '../../../../components';
import { timeZoneList } from '../../../../utils/lists/timeZone';
import { timeZoneToDisplayText } from '../../../../utils/stringUtils/index';

export type WorldClockListProps = {
  onChoose: (value: string) => void;
};

const android_ripple: PressableAndroidRippleConfig = {
  borderless: false,
  color: 'white',
};

const WorldClockList: React.FC<WorldClockListProps> = ({ onChoose }) => {
  return (
    <Container testID={testIds.CONTAINER}>
      {timeZoneList.map(item => (
        <ListItem key={item} onPress={() => onChoose(item)}>
          <Text size={18} weight="medium">
            {timeZoneToDisplayText(item)}
          </Text>
        </ListItem>
      ))}
    </Container>
  );
};

export default WorldClockList;

const Container = styled.View`
  padding: 0 20px;
  padding-bottom: 40px;
`;

const ListItem = styled(PressableArea).attrs(() => ({
  android_ripple: android_ripple,
}))`
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.dividerColor};
`;

export enum testIds {
  CONTAINER = 'WorldClockList-container',
}

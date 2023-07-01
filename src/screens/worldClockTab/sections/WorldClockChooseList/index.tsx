import React from 'react';
import { PressableAndroidRippleConfig } from 'react-native';
import styled from 'styled-components/native';
import { Text, PressableArea } from '../../../../components';
import { timeZoneToDisplayText } from '../../../../utils/stringUtils';

export type WorldClockChooseListProps = {
  list: string[];
  onChoose: (value: string) => void;
};

const android_ripple: PressableAndroidRippleConfig = {
  borderless: false,
  color: 'white',
};

const WorldClockChooseList: React.FC<WorldClockChooseListProps> = ({
  list,
  onChoose,
}) => (
  <Container testID={testIds.CONTAINER}>
    {list.map(item => (
      <ListItem testID={testIds.ITEM} key={item} onPress={() => onChoose(item)}>
        <Text size={18} weight="medium">
          {timeZoneToDisplayText(item)}
        </Text>
      </ListItem>
    ))}
  </Container>
);

export default WorldClockChooseList;

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
  CONTAINER = 'WorldClockChooseList-container',
  ITEM = 'WorldClockChooseList-item',
}

import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled, { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, SearchInput, BlockButton } from '../../../../components';
import { searchHandler } from '../../../../utils/stringUtils';
import { timeZoneList } from '../../../../utils/lists/timeZone';
import { useWorldClock } from '../../../../hooks';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WorldClockChooseRoutes } from '../../../../../routes';
import { WorldClock } from '../../../../interfaces/worldClock';
import { StatusBar } from 'expo-status-bar';

type ScreenNavigationProp = NavigationProp<
  WorldClockChooseRoutes,
  'WorldClockChoose'
>;

const searchTimeZone =
  (search: string) =>
  (timeZone: WorldClock): boolean =>
    searchHandler(timeZone.text, search);

const Choose: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const safeAreaInsets = useSafeAreaInsets();
  const { setWorldClockItem } = useWorldClock();
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const [search, setSearch] = useState('');

  const filteredList = useMemo(() => {
    return timeZoneList.filter(searchTimeZone(search));
  }, [search]);

  const handleClockChoose = (item: WorldClock) => {
    setWorldClockItem(item);
    navigation.goBack();
  };

  const RenderListItem: React.FC<{
    item: WorldClock;
    onChoose: (value: WorldClock) => void;
  }> = useCallback(
    ({ item, onChoose }) => (
      <BlockButton
        testID={testIds.ITEM}
        key={item.timeZone}
        style={styles.listItem}
        textStyle={{ size: 18 }}
        onPress={() => onChoose(item)}>
        {item.text}
      </BlockButton>
    ),
    [],
  );

  return (
    <View testID={testIds.CONTAINER}>
      <StatusBar
        backgroundColor={theme.containerSecondaryBg}
        translucent
        style={colorScheme === 'light' ? 'dark' : 'light'}
      />
      <Header>
        <View style={styles.headerContent}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={30} color={theme.primary} />
          </Pressable>
          <Text
            size={16}
            weight="semibold"
            textAlign="center"
            textMargin="0 0 4px 0">
            Escolha uma cidade
          </Text>
        </View>
        <SearchInput value={search} onChangeText={setSearch} />
      </Header>
      <FlatList
        data={filteredList}
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: safeAreaInsets.bottom + 100,
        }}
        renderItem={({ item }) => (
          <RenderListItem item={item} onChoose={handleClockChoose} />
        )}
        keyExtractor={item => item.timeZone}
      />
    </View>
  );
};

export default Choose;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  listItem: {
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
  },
});

const Header = styled(View)`
  background-color: ${({ theme }) => theme.containerSecondaryBg};
  padding: 0 20px;
`;

export enum testIds {
  CONTAINER = 'WorldClockChooseList-container',
  ITEM = 'WorldClockChooseList-item',
}

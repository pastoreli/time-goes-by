import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components/native';
import Text from '../../Text';
import TextInput from '../../TextInput';

export type SearchHeaderProps = {
  title?: string;
  search: string;
  onSearchChange: (value: string) => void;
};

const SearchHeader: React.FC<SearchHeaderProps> = ({
  title,
  search,
  onSearchChange,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {title && (
        <Text
          textAlign="center"
          size={16}
          weight="semibold"
          textMargin="10px 0 20px 0">
          {title}
        </Text>
      )}
      <View>
        <TextInput
          testID={testIds.SEARCH_HEADER_INPUT}
          value={search}
          placeholder="Search"
          prepend={<Icon name="magnify" size={25} color={theme.darken1} />}
          append={
            <TouchableOpacity
              testID={testIds.SEARCH_HEADER_ERASE}
              onPress={() => onSearchChange('')}>
              <Icon name="close-circle" size={25} color={theme.darken1} />
            </TouchableOpacity>
          }
          onChangeText={onSearchChange}
        />
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export enum testIds {
  SEARCH_HEADER_INPUT = 'Modalize-SearchHeader-input',
  SEARCH_HEADER_ERASE = 'Modalize-SearchHeader-erase',
}

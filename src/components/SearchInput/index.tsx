import React from 'react';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInput, { TextFieldProps } from '../TextInput';
import { TouchableOpacity } from 'react-native';

export type SearchInputProps = Omit<TextFieldProps, 'prepend' | 'append'>;

const SearchInput: React.FC<SearchInputProps> = ({
  onChangeText,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TextInput
      {...props}
      prepend={<Icon name="magnify" size={25} color={theme.darken1} />}
      append={
        <TouchableOpacity
          testID={testIds.SEARCH_INPUT_ERASE}
          onPress={() => onChangeText?.('')}>
          <Icon name="close-circle" size={25} color={theme.darken1} />
        </TouchableOpacity>
      }
      onChangeText={onChangeText}
    />
  );
};

export default SearchInput;

export enum testIds {
  SEARCH_INPUT_ERASE = 'SearchInput-erase',
}

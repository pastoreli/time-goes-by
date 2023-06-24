import styled, { useTheme } from 'styled-components/native';
import {
  TextInputProps,
  TextInput as ReactTextInput,
  View,
  StyleSheet,
} from 'react-native';
import React, { ReactElement, useState } from 'react';
import Text from '../Text';

export type TextFieldProps = TextInputProps & {
  label?: string;
  prepend?: ReactElement;
  append?: ReactElement | string;
  errorMessage?: string;
  touched?: boolean;
};

const TextInput: React.FC<TextFieldProps> = ({
  style,
  label,
  append,
  prepend,
  editable = true,
  errorMessage,
  autoCapitalize = 'none',
  touched,
  ...props
}) => {
  const textAlignVertical = props.multiline ? 'top' : undefined;
  const theme = useTheme();

  return (
    <View testID="TextInput" style={style}>
      {Boolean(label) && (
        <Text
          size="14"
          textMargin="0px 0px 5px 3px"
          color={theme.darken2}
          testID="TextInput-Label">
          {label}
        </Text>
      )}
      <Container testID="TextInput-Container">
        {Boolean(prepend) && prepend}
        <Input
          testID="TextInput-Input"
          style={{ textAlignVertical }}
          autoCapitalize={autoCapitalize}
          editable={editable}
          placeholderTextColor={theme.lighthen3}
          {...props}
        />
        {Boolean(append) && <View style={styles.append}>{append}</View>}
      </Container>
      <Text color={theme.danger} testID="TextInput-ErrorText">
        {Boolean(errorMessage) && touched && editable ? errorMessage : ''}
      </Text>
    </View>
  );
};

export default TextInput;

const Container = styled.View`
  flex-direction: row;
  padding: 0 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.input.bg};
  border-radius: ${({ theme }) => theme.input.borderRadius};
`;

const Input = styled(ReactTextInput)`
  height: ${({ multiline }) => (multiline ? '150' : '40')}px;
  padding: 0;
  margin: 0 5px;
  color: ${({ theme }) => theme.darken};
  font-size: 18px;
  flex: 1;
`;

const styles = StyleSheet.create({
  append: {
    marginRight: -4,
  },
});

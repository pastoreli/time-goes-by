import styled, { useTheme } from 'styled-components/native';
import {
  TextInputProps,
  TextInput as ReactTextInput,
  View,
  StyleSheet,
} from 'react-native';
import React, { ReactElement } from 'react';
import Text from '../Text';

export type TextFieldProps = TextInputProps & {
  label?: string;
  prepend?: ReactElement;
  append?: ReactElement | string;
  errorMessage?: string;
  touched?: boolean;
  bg?: string;
};

const TextInput: React.FC<TextFieldProps> = ({
  testID,
  style,
  label,
  append,
  prepend,
  editable = true,
  errorMessage,
  autoCapitalize = 'none',
  touched,
  multiline,
  bg,
  ...props
}) => {
  const textAlignVertical = multiline ? 'top' : undefined;
  const theme = useTheme();

  return (
    <View testID={testID} style={style}>
      {Boolean(label) && (
        <Text
          size="14"
          textMargin="0px 0px 5px 3px"
          color={theme.darken2}
          testID="TextInput-Label">
          {label}
        </Text>
      )}
      <Container
        testID={
          multiline
            ? testIds.TEXT_INPUT_CONTAINER_MULTILINE
            : testIds.TEXT_INPUT_CONTAINER
        }
        bg={bg}>
        {Boolean(prepend) && prepend}
        <Input
          testID={testIds.TEXT_INPUT_FIELD}
          style={{ textAlignVertical }}
          autoCapitalize={autoCapitalize}
          editable={editable}
          placeholderTextColor={theme.darken1}
          multiline={multiline}
          {...props}
        />
        {Boolean(append) && <View style={styles.append}>{append}</View>}
      </Container>
      <Text color={theme.danger} testID={testIds.TEXT_INPUT_ERROR_TEXT}>
        {Boolean(errorMessage) && touched && editable ? errorMessage : ''}
      </Text>
    </View>
  );
};

export default TextInput;

const Container = styled.View<{ bg?: string }>`
  flex-direction: row;
  padding: 0 10px;
  align-items: center;
  background-color: ${({ theme, bg }) => bg || theme.input.bg};
  border-radius: ${({ theme }) => theme.input.borderRadius};
`;

const Input = styled(ReactTextInput)`
  height: ${({ multiline }) => (multiline ? '150' : '50')}px;
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

export enum testIds {
  TEXT_INPUT_CONTAINER = 'TextInput-container',
  TEXT_INPUT_CONTAINER_MULTILINE = 'TextInput-container-multiline',
  TEXT_INPUT_FIELD = 'TextInput-field',
  TEXT_INPUT_ERROR_TEXT = 'TextInput-error-text',
}

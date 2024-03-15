import React, { ReactElement } from 'react';
import { Pressable, TouchableOpacityProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Text, { TextProps } from '../Text';

export type BlockButtonProps = TouchableOpacityProps & {
  bg?: string;
  prepend?: ReactElement;
  append?: ReactElement;
  textStyle?: TextProps;
};

const BlockButton: React.FC<BlockButtonProps> = ({
  prepend,
  append,
  children,
  testID,
  textStyle,
  ...props
}) => {
  const theme = useTheme();

  const { size, weight, color, ...textProps } = textStyle || {};

  return (
    <Container testID={testID} {...props}>
      {Boolean(prepend) && prepend}
      <Text
        {...textProps}
        testID={`${testID}-text`}
        color={color || theme.darken2}
        size={size || 16}
        weight={weight || 'medium'}>
        {children}
      </Text>
      {Boolean(append) && append}
    </Container>
  );
};

export default BlockButton;

const Container = styled(Pressable)<{ bg?: string }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 2;
  min-height: 56px;
  padding: 10px 16px;
  background-color: ${({ theme, bg }) => bg || theme.containerBg};
  border-radius: 6px;
`;

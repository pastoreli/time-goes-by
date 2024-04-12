import React, { ReactElement, useMemo } from 'react';
import styled, { useTheme } from 'styled-components/native';
import {
  TouchableOpacityProps,
  ActivityIndicator,
  Pressable,
  View,
} from 'react-native';
import Text from '../Text';

export type ButtonProps = TouchableOpacityProps & {
  loading?: boolean;
  prepend?: ReactElement;
  append?: ReactElement | string;
  block?: boolean;
  outlined?: boolean;
  color?: string;
  textColor?: string;
};

type ButtonPalletProps = {
  border: string;
  color: string;
  bg: string;
  opacity: number;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled,
  prepend,
  append,
  color,
  textColor,
  outlined,
  ...props
}) => {
  const theme = useTheme();

  const pallet = useMemo(() => {
    const buttonPallet: ButtonPalletProps = {
      bg: color || theme.primary,
      border: color || theme.primary,
      color: textColor || theme.lighthen,
      opacity: 1,
    };

    if (disabled) {
      buttonPallet.bg = theme.lighthen3;
      buttonPallet.border = theme.lighthen3;
      buttonPallet.opacity = 0.4;
      buttonPallet.color = theme.darken3;
      return buttonPallet;
    }

    if (outlined) {
      buttonPallet.opacity = 0.2;
      if (!textColor) {
        buttonPallet.color = color || theme.primary;
      }
      return buttonPallet;
    }

    return buttonPallet;
  }, [outlined, disabled, color, textColor, theme]);

  return (
    <Container
      activeOpacity={0.6}
      disabled={disabled || loading}
      testID="Button"
      android_ripple={{
        color: theme.lighthen3,
        borderless: false,
        radius: 22.5,
      }}
      borderColor={pallet.border}
      {...props}>
      <BgContainer bg={pallet.bg} opacity={pallet.opacity} />
      <Content>
        {loading ? (
          <ActivityIndicator
            testID="Button-Loading"
            color={textColor || theme.lighthen}
          />
        ) : (
          <>
            {Boolean(prepend) && prepend}
            <Text
              color={pallet.color}
              size="16"
              weight="semibold"
              testID="Button-Text">
              {children}
            </Text>
            {Boolean(append) && prepend}
          </>
        )}
      </Content>
    </Container>
  );
};

export default Button;

const Container = styled(Pressable)<{ block?: boolean; borderColor: string }>`
  position: relative;
  overflow: hidden;
  min-height: 40px;
  border-radius: 22.5px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-width: 150px;
  width: ${({ block }) => (block ? '100%' : 'auto')};
  align-self: center;
  margin-bottom: 10px;
  border: 1px solid ${({ borderColor }) => borderColor};
`;

const BgContainer = styled(View)<{ bg: string; opacity: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ bg }) => bg};
  opacity: ${({ opacity }) => opacity};
`;

const Content = styled(View)`
  padding: 15px;
`;

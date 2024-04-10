import React, { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import Text from '../Text';
import Button from '../Button';

export type InfoContentProps = {
  banner?: ReactElement;
  title: string;
  description?: string;
  hint?: string;
  hintColor?: string;
  actionText?: string;
  onActionPress?: () => void;
};

const InfoContent: React.FC<InfoContentProps> = ({
  banner,
  title,
  description,
  hint,
  hintColor,
  actionText,
  onActionPress,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {banner}
      <Text
        textAlign="center"
        size={35}
        weight="semibold"
        textMargin="40px 0 10px 0"
        color={theme.darken}>
        {title}
      </Text>
      {description && (
        <Text textAlign="center" size={20} weight="medium" color={theme.darken}>
          {description}
        </Text>
      )}
      {hint && (
        <Text
          size={16}
          color={hintColor || theme.darken}
          weight="medium"
          textAlign="center"
          textMargin="20px 0 0 0">
          {hint}
        </Text>
      )}
      {onActionPress && (
        <View style={styles.actions}>
          <Button onPress={onActionPress}>{actionText}</Button>
        </View>
      )}
    </View>
  );
};

export default InfoContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  actions: {
    marginTop: 30,
  },
});
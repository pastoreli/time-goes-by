import React, { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import Text from '../Text';
import Button from '../Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type InfoContentProps = {
  banner?: ReactElement;
  title: string;
  description?: string;
  descriptionButtonText?: string;
  hint?: string;
  hintColor?: string;
  actionText?: string;
  onDescriptionButtonPress?: () => void;
  onActionPress?: () => void;
};

const InfoContent: React.FC<InfoContentProps> = ({
  banner,
  title,
  description,
  descriptionButtonText,
  hint,
  hintColor,
  actionText,
  onActionPress,
  onDescriptionButtonPress,
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
      {onDescriptionButtonPress && (
        <TouchableOpacity onPress={onDescriptionButtonPress}>
          <Text
            color={theme.primary}
            size={16}
            weight="semibold"
            textMargin="20px 0 0 0 ">
            {descriptionButtonText}
          </Text>
        </TouchableOpacity>
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

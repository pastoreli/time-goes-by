import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';
import Button from '../Button';
import { useTheme } from 'styled-components/native';

export type EmptyInfoProps = {
  testID?: string;
  icon: string;
  title: string;
  actionText?: string;
  onActionPress?: () => void;
};

const EmptyInfo: React.FC<EmptyInfoProps> = ({
  testID,
  icon,
  title,
  actionText,
  onActionPress,
}) => {
  const theme = useTheme();

  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            ...styles.iconContainer,
            backgroundColor: theme.primaryLight,
          }}>
          <Icon name={icon} size={140} color={theme.lighthen} />
        </View>
        <Text
          size={24}
          weight="medium"
          textAlign="center"
          textMargin="40px 0"
          color={theme.darken}>
          {title}
        </Text>
        {actionText && onActionPress && (
          <Button testID={`${testID}-action`} onPress={onActionPress}>
            {actionText}
          </Button>
        )}
      </View>
    </View>
  );
};

export default EmptyInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

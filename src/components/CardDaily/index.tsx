import React, { PropsWithChildren, useMemo } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import IconIon from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';
import Card from '../Card';

export type CardDailyProps = PropsWithChildren & {
  testID?: string;
  hour: number;
  reduceIconOpacity?: boolean;
};

const CardDaily: React.FC<CardDailyProps> = ({
  testID,
  hour,
  reduceIconOpacity,
  children,
}) => {
  const colorScheme = useColorScheme();

  const cardLayout = useMemo(() => {
    const layout = {
      color: '#2DA4F4',
      icon: (
        <View
          style={{
            width: 50,
            right: -20,
            opacity: 0.6,
            transform: 'scaleX(-1)',
          }}>
          <IconIon name="partly-sunny" color="#E7CE6C" size={50} />
        </View>
      ),
    };

    if (hour >= 18 || hour <= 3) {
      layout.color = '#435F8C';
      layout.icon = (
        <IconIon
          name="moon"
          color="#E6CB6A"
          size={60}
          style={{ right: -25, opacity: 0.8 }}
        />
      );
    } else if (hour >= 12) {
      layout.color = '#FFAC6D';
      layout.icon = (
        <IconIon
          name="sunny"
          color="#FFFFFF"
          size={60}
          style={{ right: -25, opacity: 0.8 }}
        />
      );
    }

    return layout;
  }, [hour]);

  return (
    <Card testID={testID}>
      <View
        style={{
          ...styles.designContainer,
          opacity: reduceIconOpacity ? 0.1 : colorScheme === 'dark' ? 0.8 : 0.5,
        }}>
        <DesignColor color={cardLayout.color} />
        <View style={styles.designBlurContainer}>
          <BlurView
            blurRadius={25}
            blurType={colorScheme === 'dark' ? 'dark' : 'light'}
            style={styles.blur}
          />
        </View>
        {cardLayout.icon}
      </View>
      {children}
    </Card>
  );
};

export default CardDaily;

const styles = StyleSheet.create({
  designContainer: {
    position: 'absolute',
    width: '100%',
    height: 110,
    top: 0,
    right: 0,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  designBlurContainer: {
    position: 'absolute',
    width: '120%',
    height: '120%',
  },
  blur: {
    width: '100%',
    height: '100%',
  },
});

const DesignColor = styled.View<{ color: string }>`
  position: absolute;
  width: 110px;
  height: 110px;
  background-color: ${({ color }) => color};
  right: -50px;
  top: 0;
  /* opacity: 0.5; */
  border-radius: 100px;
  /* shadow-opacity: 1;
  shadow-radius: 15px;
  shadow-color: ${({ color }) => color};
  shadow-offset: -50px 0px;
  justify-content: center;
  elevation: 6; */
`;

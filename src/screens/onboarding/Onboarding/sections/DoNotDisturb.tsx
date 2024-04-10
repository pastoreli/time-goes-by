import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { InfoContent } from '../.././../../components';
import { useTheme } from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type DoNotDisturbProps = {
  actionText: string;
  onActionPress: () => void;
};

const DoNotDisturb: React.FC<DoNotDisturbProps> = ({
  actionText,
  onActionPress,
}) => {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={{ ...styles.container, paddingTop: safeAreaInsets.top }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <InfoContent
          title="Modo não perturbe"
          description={
            'Para que o Time Goes By funcione no modo "Não perturbe" acesse as configurações do modo e inclua o App.'
          }
          banner={
            <View
              style={{
                ...styles.banner,
                borderColor: theme.darken1,
              }}>
              <Image
                source={require('../../../../assets/images/ios-do-not-disturb.gif')}
                borderRadius={10}
              />
            </View>
          }
          hint="Não se esqueça de adicionar a outros modos caso você tenha!"
          actionText={actionText}
          onActionPress={onActionPress}
        />
      </ScrollView>
    </View>
  );
};

export default DoNotDisturb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingTop: 20,
  },
  banner: {
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: 'solid',
    overflow: 'hidden',
    padding: 5,
  },
});

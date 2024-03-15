import React from 'react';
import { Switch as BaseSwitch, SwitchProps } from 'react-native-switch';
import { useTheme } from 'styled-components/native';

const Switch: React.FC<SwitchProps> = ({
  renderActiveText = false,
  renderInActiveText = false,
  ...props
}) => {
  const theme = useTheme();
  return (
    <BaseSwitch
      renderActiveText={renderActiveText}
      renderInActiveText={renderInActiveText}
      backgroundActive={theme.success}
      backgroundInactive={theme.lighthen3}
      {...props}
    />
  );
};

export default Switch;

import styled from 'styled-components/native';
import { FontWeight } from '../../interfaces/theme';

export type TextProps = {
  weight?: FontWeight;
  color?: string;
  size?: number | string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  margin?: string;
  transform?: 'none' | 'capitalize' | 'lowercase' | 'uppercase';
};

const Text = styled.Text<TextProps>`
  font-family: ${({ weight = 'regular', theme }) => theme.text[weight]};
  color: ${({ color = '', theme }) => color || theme.textColor.darken};
  font-size: ${({ size = 14 }) => size}px;
  text-align: ${({ textAlign = 'auto' }) => textAlign};
  margin: ${({ margin = '0px' }) => margin};
  text-transform: ${({ transform = 'none' }) => transform};
`;

export default Text;

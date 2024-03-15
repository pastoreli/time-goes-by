import 'styled-components';
import { Theme } from '../src/interfaces/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

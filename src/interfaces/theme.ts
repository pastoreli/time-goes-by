export type Theme = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primaryOpacity: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  danger: string;
  dangerLight: string;
  warningLight: string;
  info: string;
  infoLight: string;
  dangerSuperLight: string;
  success: string;
  successLight: string;
  successSuperLight: string;
  successSecondary: string;
  containerBg: string;
  borderRadius: string;
  tabBar: {
    color: string;
  };
  dividerColor: string;
  card: {
    color: string;
  };
  input: {
    bg: string;
    borderRadius: string;
    borderColor: string;
  };
  statusBarColor: string;
  textColor: Record<TecColor, string>;
  text: Record<FontWeight, string>;
};

export type TecColor =
  | 'lighthen'
  | 'lighthen1'
  | 'lighthen2'
  | 'lighthen3'
  | 'darken1'
  | 'darken2'
  | 'darken3'
  | 'darken';

export type FontWeight =
  | 'thin'
  | 'thinItalic'
  | 'light'
  | 'lightItalic'
  | 'extralight'
  | 'extralightItalic'
  | 'regular'
  | 'regularItalic'
  | 'medium'
  | 'mediumItalic'
  | 'semibold'
  | 'semiboldItalic'
  | 'bold'
  | 'boldItalic'
  | 'extrabold'
  | 'extraboldItalic'
  | 'black'
  | 'blackItalic';

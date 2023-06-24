export type Theme = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primaryOpacity: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  lighthen: string;
  lighthen1: string;
  lighthen2: string;
  lighthen3: string;
  darken1: string;
  darken2: string;
  darken3: string;
  darken: string;
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
  text: Record<FontWeight, string>;
};

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

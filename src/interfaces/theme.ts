export type Theme = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  lighthen: string;
  lighthen1: string;
  lighthen2: string;
  lighthen3: string;
  darken1: string;
  darken2: string;
  darken3: string;
  darken: string;
  danger: string;
  warning: string;
  warningLight: string;
  success: string;
  containerBg: string;
  containerSecondaryBg: string;
  dividerColor: string;
  card: {
    color: string;
  };
  input: {
    bg: string;
    borderRadius: string;
  };
  statusBarColor: string;
  bottomNavigation: string;
  shadowColor: string;
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

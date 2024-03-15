import 'react-native';
import React from 'react';
import { render } from '../../../utils/test/test-navigation-setup';
import Alarm from './index';

describe('Render a Alarm Screen', () => {
  it('normal', () => {
    render(<Alarm />);
  });
});

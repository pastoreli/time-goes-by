import 'react-native';
import React from 'react';
import { render } from '../../../utils/test/test-navigation-setup';
import Timer from './index';

describe('Render a Timer Screen', () => {
  it('normal', () => {
    render(<Timer />);
  });
});

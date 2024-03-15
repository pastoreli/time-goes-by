import React from 'react';
import { render } from '../../utils/test/test-setup';
import Text from './index';

describe('Render a Text', () => {
  it('normal', () => {
    render(<Text>One text</Text>);
  });
  it('font weight', () => {
    render(<Text weight="bold">One text</Text>);
  });
});

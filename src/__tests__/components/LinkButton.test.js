import React from 'react';
import { shallow } from 'enzyme';

import LinkButton from '../../components/LinkButton';

describe('<LinkButton />', () => {
  describe('renders', () => {
    it('renders without crashing', () => {
      const label = 'DOTA';
      const withErrorString = shallow(<LinkButton>{label}</LinkButton>);
      expect(withErrorString.props().children).toEqual(label);
    });
  });
});

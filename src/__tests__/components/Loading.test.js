import React from 'react';
import { shallow } from 'enzyme';

import Loading from '../../components/Loading';

describe('<Loading />', () => {
  describe('renders', () => {
    it('without crashing', () => {
      shallow(<Loading />);
    });
  });
});

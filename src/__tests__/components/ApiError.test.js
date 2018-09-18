import React from 'react';
import { shallow } from 'enzyme';

import ApiError from '../../components/ApiError';

describe('<ApiError />', () => {
  describe('renders', () => {
    it('without crashing', () => {
      shallow(<ApiError errorString="" />);
    });
    it('renders error string', () => {
      const errorString = 'error';
      const withErrorString = shallow(<ApiError errorString={errorString} />);
      expect(withErrorString.props().children).toEqual(errorString);
    });
  });
});

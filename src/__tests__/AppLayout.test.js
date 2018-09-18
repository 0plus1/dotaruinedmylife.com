import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import AppLayout from '../views/layouts/AppLayout';
import SiteFooter from '../components/SiteFooter';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('<AppLayout />', () => {
  describe('renders', () => {
    const store = mockStore({
      auth: {
        token: '',
        loggingIn: false,
        loggedIn: false,
        user: null,
      },
    });
    it('without crashing', () => {
      shallow(<AppLayout />);
    });
    it('with children', () => {
      const AppLayoutWithChildren = AppLayout(SiteFooter);
      const wrapper = shallow(<AppLayoutWithChildren store={store} />).dive();
      // expect(wrapper.contains(welcome)).to.equal(true);
      expect(wrapper.contains(<SiteFooter />)).toEqual(true);
    });
  });
});

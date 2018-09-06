import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './views/Home';
import Story from './views/Story';
import OauthLogin from './views/OauthLogin';
import Logout from './views/Logout';
import PrivacyPolicy from './views/PrivacyPolicy';
import TermsOfService from './views/TermsOfService';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/story/:slug" component={Story} />
      <Route path="/login/from/redirect" component={OauthLogin} />
      <Route path="/logout" component={Logout} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route component={Home} />
    </Switch>
  </Router>
);

export default Routes;

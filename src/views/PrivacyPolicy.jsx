import React from 'react';

import RendersMarkdown from '../components/RendersMarkdown';
import AppLayout from './layouts/AppLayout';

import { privacyPolicy } from '../modules/LegalCopy';


const PrivacyPolicy = () => (
  <RendersMarkdown markdown={privacyPolicy} />
);

PrivacyPolicy.propTypes = {};

export default AppLayout(PrivacyPolicy);

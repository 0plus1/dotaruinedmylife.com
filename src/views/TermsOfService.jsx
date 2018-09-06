import React from 'react';

import AppLayout from './layouts/AppLayout';

import RendersMarkdown from '../components/RendersMarkdown';
import { termsOfService } from '../modules/LegalCopy';

const TermsOfService = () => (
  <RendersMarkdown markdown={termsOfService} />
);

TermsOfService.propTypes = {};

export default AppLayout(TermsOfService);

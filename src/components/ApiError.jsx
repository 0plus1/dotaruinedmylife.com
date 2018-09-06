import React from 'react';
import { Notification } from 'bloomer';
import PropTypes from 'prop-types';

const ApiError = ({ errorString }) => (
  <Notification isColor="danger">
    { errorString }
  </Notification>
);

ApiError.propTypes = {
  errorString: PropTypes.string.isRequired,
};

export default ApiError;

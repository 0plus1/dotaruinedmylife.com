import React from 'react';
import { Button } from 'bloomer';
import PropTypes from 'prop-types';

import './LinkButton.css';

const LinkButton = ({
  isSize,
  isLoading,
  isActive,
  onClick,
  children,
}) => (
  <Button
    isSize={isSize}
    isOutlined={false}
    isLoading={isLoading}
    isActive={isActive}
    className="linkButton"
    onClick={onClick}
  >
    {children}
  </Button>
);

LinkButton.propTypes = {
  isSize: PropTypes.string,
  isLoading: PropTypes.bool,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

LinkButton.defaultProps = {
  isSize: 'medium',
  isLoading: false,
  onClick: () => false,
  isActive: false,
};

export default LinkButton;

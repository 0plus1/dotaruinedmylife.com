import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TruncateExpand = ({ isClamped, toggleLines, children }) => {
  const keyCodeCarriageReturn = 13;
  if (!isClamped) {
    return children;
  }

  return (
    <div
      onClick={event => toggleLines(event)}
      onKeyPress={(event) => {
        if (event.keyCode === keyCodeCarriageReturn) { toggleLines(event); }
      }}
      role="button"
      tabIndex="0"
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  );
};

TruncateExpand.propTypes = {
  toggleLines: PropTypes.func.isRequired,
  isClamped: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default TruncateExpand;

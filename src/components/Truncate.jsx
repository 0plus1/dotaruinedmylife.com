import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import PropTypes from 'prop-types';

class Truncate extends Component {
  state = {
    expanded: false,
  };

  toggleLines(event) {
    event.preventDefault();
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const { children } = this.props;
    const { expanded } = this.state;
    const maxTextLines = 3;
    const childrenAsString = renderToString(children);
    return (
      <div
        onClick={event => this.toggleLines(event)}
        // Return / Enter key
        onKeyPress={(event) => { if (event.keyCode === 13) { this.toggleLines(event); } }}
        role="button"
        tabIndex="0"
        style={{ cursor: 'pointer' }}
      >
        {expanded ? (
          children
        ) : (
          <HTMLEllipsis
            unsafeHTML={childrenAsString}
            maxLine={maxTextLines}
            ellipsis=" ..."
            basedOn="letters"
          />
        )}
      </div>
    );
  }
}

Truncate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Truncate;

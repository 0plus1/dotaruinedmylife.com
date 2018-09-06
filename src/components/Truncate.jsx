import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import PropTypes from 'prop-types';

import LinkButton from './LinkButton';

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

class Truncate extends Component {
  state = {
    expanded: false,
    isClamped: false,
  };

  componentDidMount() {
    if (this.linesEllipsis) {
      this.setState({ isClamped: this.linesEllipsis.clamped });
    }
  }

  toggleLines(event) {
    event.preventDefault();
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const { forceOpen, children } = this.props;
    const { expanded, isClamped } = this.state;
    const maxTextLines = 5;
    const childrenAsString = renderToString(children);

    if (forceOpen === true) {
      return children;
    }

    return (
      <TruncateExpand toggleLines={event => this.toggleLines(event)} isClamped={isClamped}>
        {expanded ? (
          <React.Fragment>
            {children}
            {isClamped
            && (
              <LinkButton isActive isSize="small" onClick={event => this.toggleLines(event)}>
                Close
              </LinkButton>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <HTMLEllipsis
              unsafeHTML={childrenAsString}
              maxLine={maxTextLines}
              ellipsis="..."
              basedOn="letters"
              ref={(node) => { this.linesEllipsis = node; return null; }}
            />
            {isClamped
            && (
              <LinkButton isActive isSize="small" onClick={event => this.toggleLines(event)}>
                Read more
              </LinkButton>
            )}
          </React.Fragment>
        )}
      </TruncateExpand>
    );
  }
}

Truncate.propTypes = {
  forceOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Truncate.defaultProps = {
  forceOpen: false,
};

export default Truncate;

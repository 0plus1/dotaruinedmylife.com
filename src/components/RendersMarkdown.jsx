import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const RendersMarkdown = ({ markdown }) => (
  <ReactMarkdown
    className="content"
    source={markdown}
    // eslint-disable-next-line react/prop-types, react/destructuring-assignment
    renderers={{ link: props => <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a> }}
  />
);

RendersMarkdown.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export default RendersMarkdown;

import React from 'react';
import PropTypes from 'prop-types';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
} from 'react-share';

import './ShareButtons.css';

const ShareButtons = ({ markdown }) => {
  const getTitle = (markdownText) => {
    // TODO consider using something like https://github.com/remarkjs/strip-markdown
    const strippedText = markdownText.replace(/<[^>]*>/g, '');
    const previewText = strippedText.split(/\s+/).slice(0, 5).join(' ');
    return `Dota Ruined my Life, ${previewText}`;
  };
  const getUrl = () => window.location.href;
  const getHashtag = () => ['dotaruinedmylife', 'dota'];
  const getIconSize = () => 32;

  return (
    <div className="shareButtons">
      <FacebookShareButton url={getUrl()} quote={getTitle(markdown)} hashtag={`#${getHashtag()[0]}`}>
        <FacebookIcon size={getIconSize()} round />
      </FacebookShareButton>
      <TwitterShareButton url={getUrl()} via="dotaruinslives" title={getTitle(markdown)} hashtags={getHashtag()}>
        <TwitterIcon size={getIconSize()} round />
      </TwitterShareButton>
      <WhatsappShareButton url={getUrl()} title={getTitle(markdown)}>
        <WhatsappIcon size={getIconSize()} round />
      </WhatsappShareButton>
      <RedditShareButton url={getUrl()} title={getTitle(markdown)}>
        <RedditIcon size={getIconSize()} round />
      </RedditShareButton>
    </div>
  );
};

ShareButtons.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export default ShareButtons;

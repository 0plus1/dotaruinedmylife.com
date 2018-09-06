import React from 'react';
import {
  Footer,
  Container,
  Content,
  Columns,
  Column,
} from 'bloomer';

import './SiteFooter.css';

const copyrightNotice = 'Dota, the Dota 2 logo, and Defense of the Ancients are trademarks and/or registered trademarks of Valve Corporation.';

const SiteFooter = () => (
  <Footer>
    <Container>
      <Content>
        <Columns>
          <Column>
            <p>
              Made with
              {' '}
              <span role="img" aria-label="Heart">
                ♥y
              </span>
              {' '}
              -
              {' '}
              <a href="https://github.com/dotaruinedmylife/web_client" target="_blank" rel="noreferrer noopener">open source</a>
            </p>
          </Column>
        </Columns>
        <Content isSize="small">
          <p>
            By interacting with this website you accept our
            {' '}
            <a href="/#/terms-of-service">Terms of Service</a>
            {' '}
            and
            {' '}
            <a href="/#/privacy-policy">Privacy Policy</a>
          </p>
          <p>
            {copyrightNotice}
          </p>
        </Content>
      </Content>
    </Container>
  </Footer>
);

export default SiteFooter;

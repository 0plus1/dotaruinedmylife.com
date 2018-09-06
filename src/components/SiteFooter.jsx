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
              Made
              {' '}
              with
              {' '}
              <span role="img" aria-label="Heart">
                ♥
              </span>
              in
              {' '}
              Melbourne
              {' '}
              -
              {' '}
              <a href="https://github.com/dotaruinedmylife/web_client" target="_blank" rel="noreferrer noopener">open source</a>
            </p>
          </Column>
        </Columns>
        <Content isSize="small">
          <p>
            {copyrightNotice}
          </p>
        </Content>
      </Content>
    </Container>
  </Footer>
);

export default SiteFooter;

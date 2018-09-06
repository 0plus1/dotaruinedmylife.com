import React from 'react';
import { Column } from 'bloomer';
import ReactLoading from 'react-loading';

const Loading = () => (
  <Column isSize="1/3">
    <ReactLoading type="bars" color="#000" height={667} width={375} />
  </Column>
);

export default Loading;

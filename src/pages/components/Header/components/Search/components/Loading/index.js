/* Core */
import React from 'react';

const Loading = props => (
  <img
    src={require('assets/images/loading.gif')}
    width={40}
    height={40}
    alt=""
    {...props}
  />
);

export default Loading;

/* Core */
import React from 'react';

/* Redux */
import { Provider } from 'react-redux';
import store from 'store';

/* Presentational */
import Main from 'pages/main';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;

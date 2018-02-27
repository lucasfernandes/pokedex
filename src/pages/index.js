/* Core */
import React from 'react';

/* Redux */
import { Provider } from 'react-redux';
import store from '../store';

/* Presentational */
import Header from './components/Header';
import Menu from './components/Menu';
import './styles/app.css';
// import '../styles/app.scss';

console.tron.log('Test Log');

const App = () => (
  <Provider store={store}>
    <div className="container">
      <Header />
      <Menu />
    </div>
  </Provider>
);

export default App;

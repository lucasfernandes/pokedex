import Reactotron from 'reactotron-react-js';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron
    .configure({ host: '10.0.0.26' })
    .use(reduxPlugin())
    .use(sagaPlugin())
    .connect();

  tron.clear();

  console.tron = tron;
  console.display = tron;
}


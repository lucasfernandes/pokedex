import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD_bd8E6CAufvlVwA8_ty-7qwPXRYe5wjo',
  authDomain: 'pokedex-80740.firebaseapp.com',
  databaseURL: 'https://pokedex-80740.firebaseio.com',
  projectId: 'pokedex-80740',
  storageBucket: 'gs://pokedex-80740.appspot.com',
  messagingSenderId: '880275253751',
};

const Firebase = firebase.initializeApp(config);

export default Firebase;

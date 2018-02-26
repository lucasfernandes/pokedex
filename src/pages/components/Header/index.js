/* Core */
import React from 'react';

/* Presentational */
// import pokeball from '../../../assets/images/pokeball.png';

import './styles.css';

const Header = () => (
  <div className="container">
    <div className="title">PokeDéx</div>
    <div className="blackSlice" />
    <div className="pokeball">
      <img src={require('../../../assets/images/pokeball.png')} alt=""/>
    </div>
  </div>
);

export default Header;

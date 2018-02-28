/* Core */
import React from 'react';

/* Presentational */
import Search from './components/Search';
import './styles.css';

const Header = () => (
  <div className="headerContainer">
    <div className="title">PokeDéx</div>
    <div className="blackSlice" />
    <div className="pokeball">
      <img src={require('assets/images/pokeball.png')} alt="" />
    </div>
    <Search />
  </div>
);

export default Header;

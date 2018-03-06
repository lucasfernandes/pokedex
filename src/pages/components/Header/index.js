/* Core */
import React from 'react';

/* Presentational */
import Search from './components/Search';
import './styles.css';

const Header = () => (
  <div className="headerContainer">
    <div className="title"><a href="https://pokedex-challenge.herokuapp.com">PokeDéx</a></div>
    <div className="blackSlice" />
    <div className="pokeball">
      <a href="https://pokedex-challenge.herokuapp.com">
        <img src={require('assets/images/pokeball.png')} alt="" />
      </a>
    </div>
    <Search />
  </div>
);

export default Header;

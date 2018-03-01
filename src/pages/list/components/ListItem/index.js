/* Core */
import React from 'react';

import './styles.css';

const ListItem = () => (
  <div className="listItemContainer">
    <div className="list-item-title">Charizard</div>
    <div className="list-item-image">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="" />
    </div>
    <div className="list-item-added">
      <img className="poke-added" src={require('assets/images/pokeball-added.png')} alt="" />
    </div>
  </div>
);

export default ListItem;

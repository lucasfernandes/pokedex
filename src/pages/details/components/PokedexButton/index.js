/* Core */
import React from 'react';

/* Presentational */
import IconPlus from 'react-icons/lib/go/plus';

import './styles.css';

const PokedexButton = props => (
  <div className="pokedexButtonContainer" title="Add to my Pokedéx">
    <IconPlus size={50} color="#D78989" />
  </div>
);

export default PokedexButton;


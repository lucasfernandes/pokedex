/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import IconPlus from 'react-icons/lib/go/plus';
import IconX from 'react-icons/lib/go/x';

import './styles.css';

const renderButton = (onClick, pokedex) => (
  pokedex === false
    ? <IconPlus size={50} color="#D78989" onClick={() => onClick()} />
    : <IconX size={50} color="#D78989" onClick={() => onClick()} />
);

const PokedexButton = props => (
  <div className="pokedexButtonContainer" title="Add to my Pokedéx">
    {renderButton(props.onClick, props.search.pokedex)}
  </div>
);

PokedexButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  search: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps)(PokedexButton);


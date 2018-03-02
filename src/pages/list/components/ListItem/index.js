/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import SearchActions from 'store/ducks/search';
import AddPokemonActions from 'store/ducks/addPokemon';
import RemovePokemonActions from 'store/ducks/removePokemon';
import LoaderActions from 'store/ducks/loader';

/* Presentational */
import IconPlus from 'react-icons/lib/go/plus';
import IconX from 'react-icons/lib/go/x';

import './styles.css';

const renderClick = (action, pokemon) => {
  const { id, name, sprites } = pokemon;

  if (action === 'add') {
    // return this.props.addPokemonRequest(id, name, sprites.front_default, false);
    return console.tron.log('clicou pra adicionar');
  }

  return console.tron.log('clicou pra remover');
  // return this.props.removePokemonRequest(id, name);
};

const renderButton = (pokedex, pokemon) => (
  pokedex.saved === false
    ? <IconPlus size={50} color="#D78989" className="poke-added" onClick={() => renderClick('add', pokemon)} />
    : <IconX size={50} color="#D78989" className="poke-added" onClick={() => renderClick('remove', pokemon)} />
);

const handleDetails = (searchRequest, pokemon, loaderLoadingOn) => {
  loaderLoadingOn();
  return searchRequest(pokemon.name);
};

const ListItem = ({ pokemon, pokedex, searchRequest, loaderLoadingOn }) => (
  <div className="listItemContainer">
    <button className="listItemButton" onClick={() => handleDetails(searchRequest, pokemon, loaderLoadingOn)}>
      <div className="list-item-title">{pokemon.name}</div>
      <div className="list-item-image">
        <img className="list-item-image-tag" src={pokemon.image} alt="" />
      </div>
    </button>
    <div className="list-item-added">
      {renderButton(pokedex, pokemon)}
    </div>
  </div>
);

ListItem.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sprites: PropTypes.shape({
      front_default: PropTypes.string,
    }),
  }).isRequired,

  pokedex: PropTypes.shape({
    saved: PropTypes.bool,
  }).isRequired,

  searchRequest: PropTypes.func.isRequired,
  loaderLoadingOn: PropTypes.func.isRequired,
  // addPokemonRequest: PropTypes.func.isRequired,
  // removePokemonRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  search: state.search,
  pokedex: state.pokedex,
});

const mapDispatchToProps = dispatch => ({
  searchRequest: pokemon => dispatch(SearchActions.searchRequest(pokemon)),

  addPokemonRequest: (id, name, image, favorite) =>
    dispatch(AddPokemonActions.addPokemonRequest(id, name, image, favorite)),

  removePokemonRequest: (id, name) =>
    dispatch(RemovePokemonActions.removePokemonRequest(id, name)),

  loaderLoadingOn: () => dispatch(LoaderActions.loaderLoadingOn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);

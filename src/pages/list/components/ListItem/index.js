/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import SearchActions from 'store/ducks/search';
import PokedexActions from 'store/ducks/pokedex';
import AddPokemonActions from 'store/ducks/addPokemon';
import RemovePokemonActions from 'store/ducks/removePokemon';
import LoaderActions from 'store/ducks/loader';

/* Presentational */
// import IconPlus from 'react-icons/lib/go/plus';
import IconX from 'react-icons/lib/go/x';

import './styles.css';


class ListItem extends Component {
  state = {};

  componentDidMount() {
    // this.props.pokedexRequest(this.props.pokemon.name);
  }

  handleDetails = () => {
    const { pokemon } = this.props;
    this.props.loaderLoadingOn();
    return this.props.searchRequest(pokemon.name);
  };

  renderButton = () => (
    <IconX size={50} color="#D78989" className="poke-added" onClick={() => this.renderClick()} />
  );

  renderClick = () => {
    const { pokemon } = this.props;
    const { id, name } = pokemon;

    return this.props.removePokemonRequest(id, name);
  };

  render() {
    const {
      pokemon,
      pokedex,
    } = this.props;

    return (
      <div className="listItemContainer">
        <button className="listItemButton" onClick={() => this.handleDetails()}>
          <div className="list-item-title">{pokemon.name}</div>
          <div className="list-item-image">
            <img className="list-item-image-tag" src={pokemon.image} alt="" />
          </div>
        </button>
        <div className="list-item-added">
          {this.renderButton(pokedex.saved, pokemon)}
        </div>
      </div>
    );
  }
}

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

  removePokemonRequest: (id, name) =>
    dispatch(RemovePokemonActions.removePokemonRequest(id, name)),

  loaderLoadingOn: () => dispatch(LoaderActions.loaderLoadingOn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);

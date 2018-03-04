/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import SearchActions from 'store/ducks/search';
import SearchByNameForTypeActions from 'store/ducks/searchByNameForType';
import PokedexActions from 'store/ducks/pokedex';
import AddPokemonActions from 'store/ducks/addPokemon';
import RemovePokemonActions from 'store/ducks/removePokemon';
import LoaderActions from 'store/ducks/loader';

/* Presentational */
// import IconPlus from 'react-icons/lib/go/plus';
import IconPlus from 'react-icons/lib/go/plus';

import './styles.css';


class ListItem extends Component {
  state = {
    image: require('assets/images/loading.gif'),
  };

  componentDidMount() {
    this.loadPokemon();
  }

  handleDetails = () => {
    const { pokemon } = this.props;
    this.props.loaderLoadingOn();
    return this.props.searchRequest(pokemon.name);
  };

  loadPokemon = () => (
    this.props.searchByNameForTypeRequest(this.props.pokemon.name)
  )

  checkAndGetPokemonOnList = (name, data) => (
    data.find(item => item.name === name)
  )

  renderButton = () => (
    <IconPlus size={50} color="#D78989" className="poke-added" onClick={() => this.renderClick()} />
  );

  renderClick = () => {
    const { pokemon } = this.props;
    const { id, name } = pokemon;

    return this.props.addPokemonRequest(id, name);
  };

  renderImage = result => (
    <img className="list-item-image-tag" src={result === false ? this.state.image : result.image} alt="" />
  )

  render() {
    const { pokemon } = this.props;
    const { data } = this.props.searchByNameForType;

    let result = false;

    if (data.length === this.props.searchByType.data.pokemon.length) {
      result = this.checkAndGetPokemonOnList(pokemon.name, data);
      console.log(result.image);
    }

    return (
      <div className="listItemContainer">
        <button className="listItemButton" onClick={() => this.handleDetails()}>
          <div className="list-item-title">{pokemon.name}</div>
          <div className="list-item-image">
            {this.renderImage(result)}
          </div>
        </button>
        <div className="list-item-added">
          {this.renderButton(pokemon)}
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
  searchByNameForType: state.searchByNameForType,
  searchByType: state.searchByType,
});

const mapDispatchToProps = dispatch => ({
  searchRequest: pokemon => dispatch(SearchActions.searchRequest(pokemon)),

  removePokemonRequest: (id, name) =>
    dispatch(RemovePokemonActions.removePokemonRequest(id, name)),

  addPokemonRequest: pokemon =>
    dispatch(RemovePokemonActions.addPokemonRequest(pokemon)),

  loaderLoadingOn: () => dispatch(LoaderActions.loaderLoadingOn()),

  searchByNameForTypeRequest: pokemon =>
    dispatch(SearchByNameForTypeActions.searchByNameForTypeRequest(pokemon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);

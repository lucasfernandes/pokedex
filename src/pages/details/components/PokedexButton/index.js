/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import PokedexActions from 'store/ducks/pokedex';
import AddPokemondActions from 'store/ducks/addPokemon';
import RemovePokemondActions from 'store/ducks/removePokemon';
import LoaderActions from 'store/ducks/loader';

/* Presentational */
import IconPlus from 'react-icons/lib/go/plus';
import IconX from 'react-icons/lib/go/x';

import './styles.css';


class PokedexButton extends Component {
  static propTypes = {
    pokedex: PropTypes.shape({
      saved: PropTypes.bool,
    }).isRequired,

    pokemonInfo: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      sprites: PropTypes.shape({
        front_default: PropTypes.string,
      }),
    }).isRequired,

    addPokemonRequest: PropTypes.func.isRequired,
    removePokemonRequest: PropTypes.func.isRequired,
    pokedexRequest: PropTypes.func.isRequired,
    loaderLoadingOn: PropTypes.func.isRequired,
  };

  state = {};

  componentDidMount() {
    this.props.pokedexRequest(this.props.pokemonInfo.name);
  }

  renderClick = (action) => {
    this.props.loaderLoadingOn();
    const { id, name, sprites } = this.props.pokemonInfo;

    if (action === 'add') {
      return this.props.addPokemonRequest(id, name, sprites.front_default, false);
    }

    return this.props.removePokemonRequest(id, name);
  }

  renderButton = () => (
    this.props.pokedex.saved === false
      ? <IconPlus size={30} color="#D78989" onClick={() => this.renderClick('add')} />
      : <IconX size={30} color="#D78989" onClick={() => this.renderClick('remove')} />
  );

  render() {
    return (
      <div className="pokedexButtonContainer" title="Add to my Pokedéx">
        {this.renderButton()}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  pokedex: state.pokedex,
});

const mapDispatchToProps = dispatch => ({
  pokedexRequest: pokemon => dispatch(PokedexActions.pokedexRequest(pokemon)),

  addPokemonRequest: (id, name, image, favorite) =>
    dispatch(AddPokemondActions.addPokemonRequest(id, name, image, favorite)),

  removePokemonRequest: (id, name) =>
    dispatch(RemovePokemondActions.removePokemonRequest(id, name)),

  loaderLoadingOn: () => dispatch(LoaderActions.loaderLoadingOn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokedexButton);


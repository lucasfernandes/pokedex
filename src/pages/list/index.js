/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'config/FirebaseConfig';

/* Redux */
import { connect } from 'react-redux';
import ListActions from 'store/ducks/list';

/* Presentational */
import ListItem from './components/ListItem';
import ListItemType from './components/ListItemType';
import './styles.css';

class List extends Component {
  static propTypes = {
    searchByType: PropTypes.shape({
      typeName: PropTypes.string,
      data: PropTypes.shape({}),
    }).isRequired,
    list: PropTypes.shape({
      pokemonsList: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
    listAdd: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const pokemonsRef = rootRef.child('pokemons');

    pokemonsRef.on('value', (snap) => {
      if (snap.val() !== null) {
        this.props.listAdd(snap.val());
      }
    });
  }

  listItems = pokemonsList => (
    Object.values(pokemonsList).length === 0
      ? this.renderEmpty()
      : Object.values(pokemonsList).map(pokemon => (
        <div key={pokemon.id} className="list-aligner">
          <ListItem key={pokemon.id} pokemon={pokemon} />
        </div>
      ))
  );

  listItemsByType = data => (
    Object.values(data.pokemon).length === 0
      ? this.renderEmpty()
      : Object.values(data.pokemon).map(item => this.renderListItemType(item))
  )

  renderListItemType = item => (
    <div key={item.pokemon.name} className="list-aligner">
      <ListItemType key={item.pokemon.name} pokemon={item.pokemon} />
    </div>
  );

  renderEmpty = () => (
    <div className="empty">
      <img src={require('assets/images/empty.png')} alt="" />
      Find a pokemon and catch!
    </div>
  )

  renderTitle = (typeName) => {
    let title = 'Known Pokemons';
    let back = null;

    if (typeName !== '') {
      title = `${typeName} pokemons`;
      back = <a href="https://pokedex-challenge.herokuapp.com">Pokedex - </a>;
    }

    return (
      <div className={`listTitle ${typeName}`}>
        {back}
        {title}
      </div>
    );
  }

  render() {
    const { typeName, data } = this.props.searchByType;
    const { pokemonsList } = this.props.list;

    return (
      <div className="listContainer">
        {(pokemonsList.length > 0 || typeName !== '')
          && this.renderTitle(typeName)}
        <div className="listItemsContainer">
          {this.props.searchByType.typeName === ''
            ? this.listItems(pokemonsList)
            : this.listItemsByType(data)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchByType: state.searchByType,
  list: state.list,
});

const mapDispatchToProps = dispatch => ({
  listAdd: pokemons => dispatch(ListActions.listAdd(pokemons)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

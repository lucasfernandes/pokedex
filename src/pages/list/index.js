/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'config/FirebaseConfig';

/* Redux */
import { connect } from 'react-redux';

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
  };

  static defaultProps = {};

  constructor() {
    super();
    this.state = {
      pokemons: {},
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const pokemonsRef = rootRef.child('pokemons');

    pokemonsRef.on('value', (snap) => {
      if (snap.val() !== null) {
        this.setState({ pokemons: snap.val() });

        // check there's in pokedex
        // this.props.pokedexRequestList(snap.val());
      }
    });
  }

  listItems = () => (
    Object.values(this.state.pokemons).length === 0
      ? this.renderEmpty()
      : Object.values(this.state.pokemons).map(pokemon => (
        <div className="list-aligner">
          <ListItem key={pokemon.id} pokemon={pokemon} />
        </div>
      ))
  );

  listItemsByType = data => (
    Object.values(data.pokemon).length === 0
      ? this.renderEmpty()
      : Object.values(data.pokemon).map(item => (
        <div className="list-aligner">
          <ListItemType key={item.pokemon.name} pokemon={item.pokemon} />
        </div>
      ))
  )

  renderEmpty = () => (
    <div>Sua pokedex está vazia</div>
  )

  renderTitle = typeName => (
    this.props.searchByType.typeName === ''
      ? 'Known Pokemons'
      : `All ${typeName} pokemons`
  )

  render() {
    const { typeName, data } = this.props.searchByType;

    return (
      <div className="listContainer">
        <div className="listTitle">
          {this.renderTitle(typeName)}
        </div>
        <div className="listItemsContainer">
          {this.props.searchByType.typeName === ''
            ? this.listItems()
            : this.listItemsByType(data)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchByType: state.searchByType,
});


export default connect(mapStateToProps)(List);

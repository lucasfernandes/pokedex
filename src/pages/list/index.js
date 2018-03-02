/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'config/FirebaseConfig';

import ListItem from './components/ListItem';
import './styles.css';

export default class List extends Component {
  static propTypes = {};

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

  renderEmpty = () => (
    <div>Sua pokedex está vazia</div>
  )

  render() {
    return (
      <div className="listContainer">
        <div className="listTitle">
          Known Pokemons
        </div>
        <div className="listItemsContainer">
          {this.listItems()}
        </div>
      </div>
    );
  }
}

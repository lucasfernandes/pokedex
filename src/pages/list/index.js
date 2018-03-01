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
      pokemons: [],
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const pokemonsRef = rootRef.child('pokemons');
    pokemonsRef.on('value', (snap) => {
      this.setState({
        pokemons: snap.val(),
      });
    });
  }

  render() {
    console.tron.log(this.state.pokemons);
    return (
      <div className="listContainer">
        <div className="listTitle">
          Pokemons Added
        </div>
        <div className="listItemsContainer">
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          <div className="list-aligner">
            <ListItem />
          </div>
          
        </div>
      </div>
    );
  }
}

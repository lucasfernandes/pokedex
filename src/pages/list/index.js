/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'config/FirebaseConfig';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
// import _ from 'lodash';
import ListItem from './components/ListItem';
import ListItemType from './components/ListItemType';
import './styles.css';

class List extends Component {
  static propTypes = {
    searchByType: PropTypes.shape({
      typeName: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
  };

  static defaultProps = {};

  constructor() {
    super();
    // this.renderListItemType = _.throttle(this.renderListItemType, 500);

    this.state = {
      pokemons: {},
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const pokemonsRef = rootRef.child('pokemons');

    pokemonsRef.on('value', (snap) => {
      if (snap.val() !== null) {
        console.tron.log(snap.val());
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
        <div key={pokemon.id} className="list-aligner">
          <ListItem key={pokemon.id} pokemon={pokemon} />
        </div>
      ))
  );

  listItemsByType = data => (
    Object.values(data.pokemon).length === 0
      ? this.renderEmpty()
      : Object.values(data.pokemon).map((item, index) => this.renderListItemType(item, index))
  )

  renderListItemType = (item, index) => (
    <div className="list-aligner">
      <ListItemType key={item.pokemon.name} pokemon={item.pokemon} shouldHide={index <= 15 ? true : false} />
    </div>
  );

  renderEmpty = () => (
    <div className="empty">
      <img src={require('assets/images/empty.png')} alt="" />
      ...Nothing...
    </div>
  )

  renderTitle = (typeName) => {
    let listClass = 'listTitle';
    let title = 'Known Pokemons';
    let back = null;

    if (typeName !== '') {
      listClass += ' listTitleType';
      title = `${typeName} pokemons`;
      back = <a href="https://pokedex-challenge.herokuapp.com">Pokedex - </a>;
    }

    return (
      <div className={`${listClass} ${typeName}`}>
        {back}
        {title}
      </div>
    );
  }

  render() {
    const { typeName, data } = this.props.searchByType;

    return (
      <div className="listContainer">
        {this.renderTitle(typeName)}
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

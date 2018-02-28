/* Core */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

/* Redux */
import { connect } from 'react-redux';
import SearchActions from 'store/ducks/search';

/* Presentational */
import TextInput from './components/TexInput';
import Button from './components/Button';
import Loading from './components/Loading';
import './styles.css';

class Search extends Component {
  static propTypes = {
    searchRequest: PropTypes.func.isRequired,
    search: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      // data: PropTypes.arrayOf(PropTypes.shape({ login: PropTypes.string })),
    }).isRequired,
  };

  state = {
    pokemon: '',
  }

  requestSearch = () => {
    const { pokemon } = this.state;

    if (pokemon === '') return;
    this.props.searchRequest(pokemon);
  }

  handleChange = event => (
    this.setState({ pokemon: event.target.value.toLowerCase() })
  );

  renderLoading = () => (
    <Loading className="loading" />
  );

  renderButton = () => (
    <Button
      className="searchButton"
      onClick={() => this.requestSearch()}
    />
  );

  renderError = () => (
    <div className="notfound">- Pokemon not found</div>
  );

  render() {
    const { data, loading, error } = this.props.search;

    return (
      <div className="searchContainer">
        <TextInput
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Pesquise um pokemon"
          error={error}
        />

        {loading
          ? this.renderLoading()
          : this.renderButton()}

        {error && this.renderError()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  searchRequest: pokemon => dispatch(SearchActions.searchRequest(pokemon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
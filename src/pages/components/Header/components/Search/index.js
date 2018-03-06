/* Core */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import SearchActions from 'store/ducks/search';
import LoaderActions from 'store/ducks/loader';

/* Presentational */
import { notify } from 'react-notify-toast';
import TextInput from './components/TexInput';
import Button from './components/Button';
import Loading from './components/Loading';
import './styles.css';

class Search extends Component {
  static propTypes = {
    searchRequest: PropTypes.func.isRequired,
    loaderLoadingOn: PropTypes.func.isRequired,
    search: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
    }).isRequired,
  };

  state = {
    pokemon: '',
  }

  requestSearch = () => {
    const { pokemon } = this.state;

    if (pokemon === '') return;

    this.props.loaderLoadingOn();
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
    const { loading, error } = this.props.search;

    return (
      <div className="searchContainer">
        <TextInput
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Pesquisa"
          error={error ? 'true' : 'false'}
        />

        {loading
          ? this.renderLoading()
          : this.renderButton()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  searchRequest: pokemon => dispatch(SearchActions.searchRequest(pokemon)),
  loaderLoadingOn: () => dispatch(LoaderActions.loaderLoadingOn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

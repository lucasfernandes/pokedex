/* Core */
import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import LoaderActions from 'store/ducks/loader';
import AddPokemonActions from 'store/ducks/addPokemon';
import SearchActions from 'store/ducks/search';

/* Firebase */
import firebase from 'firebase';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

/* Presentational */
import IconCamera from 'react-icons/lib/go/device-camera';

const pokemonRef = firebase.storage().ref('images');

class Uploader extends Component {
  handleUploadStart = () => this.props.loaderLoadingOn();

  handleUploadSuccess = async (filename) => {
    const { id, name, favorite } = this.props.data;
    const pokemonImage = await pokemonRef.child(filename).getDownloadURL();

    this.props.addPokemonRequest(id, name, pokemonImage, false);
    this.props.searchRequest(this.props.data.name);
  };

  render() {
    const { name } = this.props.data;

    return (
      <CustomUploadButton
        accept="image/*"
        filename={name}
        storageRef={pokemonRef}
        onUploadStart={this.handleUploadStart}
        onUploadSuccess={this.handleUploadSuccess}
      >
        <IconCamera size={22} className="icon-upload" />
      </CustomUploadButton>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  loaderLoadingOn: () => dispatch(LoaderActions.loaderLoadingOn()),
  searchRequest: pokemon => dispatch(SearchActions.searchRequest(pokemon)),
  addPokemonRequest: (id, name, image, favorite) =>
    dispatch(AddPokemonActions.addPokemonRequest(id, name, image, favorite)),
});

export default connect(null, mapDispatchToProps)(Uploader);

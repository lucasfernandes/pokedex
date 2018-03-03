/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import DetailsCardActions from 'store/ducks/detailsCard';
import AddPokemondActions from 'store/ducks/addPokemon';

/* Presentational */
import * as Icons from 'react-icons/lib/go';
import Uploader from './components/Uploader';
import PokedexButton from './components/PokedexButton';
import Infos from './components/Infos';
import './styles.css';

class Details extends Component {
  static propTypes = {
    search: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.shape({
        name: PropTypes.string,
        height: PropTypes.string,
        weight: PropTypes.string,
        sprites: PropTypes.shape({
          front_default: PropTypes.string,
        }),
      }),
    }).isRequired,
    addPokemonRequest: PropTypes.func.isRequired,
    detailsCardClose: PropTypes.func.isRequired,
  };

  state = {
  }

  closeDetails = () => (
    this.props.detailsCardClose()
  );

  renderContent = (loading, data) => (
    loading
      ? this.renderLoading()
      : this.renderDetails(data)
  )

  renderLoading = () => (
    <div styles="display:flex; flex: 1; selfAlign: center;">Loading</div>
  );


  renderDetails = data => (
    <div className="detailsContainer">
      <div className="detailsCard">
        <div className="topCard">
          <div className="closeCard">
            <Icons.GoX size={25} color="#FFF" onClick={() => this.closeDetails()} />
          </div>
          <div className="avatarBox">
            <div className="iconChevron" title="Previous Level">
              <Icons.GoChevronLeft size={60} color="#BABABA" />
              <div>XuxaSauro</div>
            </div>
            <div className="avatar-ball">
              <img
                className="avatar-img"
                src={data.sprites.front_default}
                alt=""
              />
              <div className="avatar-upload">
                <Uploader data={data} />
              </div>
            </div>
            <div className="iconChevron" title="Next Level">
              <Icons.GoChevronRight size={60} color="#BABABA" />
              <div>Charmeleon</div>
            </div>
          </div>
          <div className="avatarInfo">
            <div className="avatarName">
              {data.name}
            </div>
            <div className="avatarHW">
              H: {data.height}m / W: {data.weight}kg
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <div className="buttonAligner">
            <PokedexButton pokemonInfo={data} />
          </div>
        </div>
        <div className="bottomContainer">
          <Infos stats={data.stats} types={data.types} abilities={data.abilities} />
        </div>
      </div>
    </div>
  )

  render() {
    const { loading, data } = this.props.search;

    return (
      this.renderContent(loading, data)
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  detailsCardClose: () => dispatch(DetailsCardActions.detailsCardClose()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Details);

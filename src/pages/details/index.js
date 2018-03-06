/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import DetailsCardActions from 'store/ducks/detailsCard';
import SearchActions from 'store/ducks/search';
import LoaderActions from 'store/ducks/loader';

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
        height: PropTypes.number,
        weight: PropTypes.number,
        sprites: PropTypes.shape({
          front_default: PropTypes.string,
        }),
      }),
    }).isRequired,
    inPokedex: PropTypes.bool.isRequired,
    detailsCardClose: PropTypes.func.isRequired,
  };

  state = {
  }

  closeDetails = () => (
    this.props.detailsCardClose()
  );

  renderContent = (loading, data) => (
    !loading && this.renderDetails(data)
  )

  renderEvolvesFrom = data => (
    data.chain.evolvesFrom !== null &&
      <div className="iconChevron" title="Previous Level">
        <Icons.GoChevronLeft
          size={40}
          color="#BABABA"
          onClick={() => {
            this.props.loaderLoadingOn();
            this.props.searchRequest(data.chain.evolvesFrom);
          }}
        />
        <div>{data.chain.evolvesFrom}</div>
      </div>
  )

  renderEvolvesTo = data => (
    data.chain.evolvesFrom !== null &&
      <div className="iconChevron" title="Next Level">
        {/* <Icons.GoChevronRight size={40} color="#BABABA" /> */}
        {/* <div>{data.chain.evolvesTo}</div> */}
      </div>
  )


  renderDetails = data => (
    <div className="detailsContainer">
      <div className="detailsCard">
        <div className="topCard">
          <div className="closeCard">
            <Icons.GoX size={20} color="#FFF" onClick={() => this.closeDetails()} />
          </div>
          <div className="avatarBox">

            {this.renderEvolvesFrom(data)}

            <div className="avatar-ball">
              <img
                className="avatar-img"
                src={data.sprites.front_default}
                alt=""
              />
              { this.props.inPokedex &&
                <div className="avatar-upload">
                  <Uploader data={data} />
                </div>
              }
            </div>
            {this.renderEvolvesTo(data)}
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
          <Infos
            stats={data.stats}
            types={data.types}
            abilities={data.abilities}
            short_effects={data.short_effects}
          />
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
  inPokedex: state.pokedex.saved,
});

const mapDispatchToProps = dispatch => ({
  detailsCardClose: () => dispatch(DetailsCardActions.detailsCardClose()),
  searchRequest: pokemon => dispatch(SearchActions.searchRequest(pokemon)),
  loaderLoadingOn: () => dispatch(LoaderActions.loaderLoadingOn()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Details);

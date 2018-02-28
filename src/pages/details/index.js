/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import * as Icons from 'react-icons/lib/go';
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
  };

  state = {
  }

  renderContent = (loading, data) => (
    loading
      ? this.renderLoading()
      : this.renderDetails(data)
  )

  renderLoading = () => (
    <div styles="display:flex; flex: 1; selfAlign: center;">TA CARREGANDO CARAI!</div>
  );

  renderDetails = data => (
    <div className="detailsContainer">
      <div className="detailsCard">
        <div className="topCard">
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
            <PokedexButton />
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


export default connect(mapStateToProps)(Details);

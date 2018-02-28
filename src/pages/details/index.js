/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import * as Icons from 'react-icons/lib/go';
import PokedexButton from './components/PokedexButton';
import './styles.css';

class Details extends Component {
  static propTypes = {
    search: PropTypes.shape({
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

  state = {}

  render() {
    const {
      name, height, weight, sprites,
    } = this.props.search.data;

    return (
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
                  src={sprites.front_default}
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
                {name}
              </div>
              <div className="avatarHW">
                height: {height} / weight: {weight}
              </div>
            </div>
          </div>
          <div className="buttonContainer">
            <div className="buttonAligner">
              <PokedexButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
});


export default connect(mapStateToProps)(Details);

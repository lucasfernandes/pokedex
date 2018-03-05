/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import Header from 'pages/components/Header';
import Details from 'pages/details';
import List from 'pages/list';
import Notifications from 'react-notify-toast';
import './styles.css';

const renderDetails = (data, open) => (
  data.length !== 0 && open && <Details />
);

const Main = ({ search, open, loading }) => (
  <div>
    <Notifications />
    <div className="container">
      {renderDetails(search, open)}
      <Header />
      <List />
    </div>
    <div
      className={`loading-overlay ${loading === false && 'hidden'}`}
    >
      <img src={require('assets/images/loading.gif')} alt="" />
      Loading
    </div>
  </div>
);

Main.propTypes = {
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
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  search: state.search,
  open: state.detailsCard.open,
  loading: state.loader.loading,
});

export default connect(mapStateToProps)(Main);

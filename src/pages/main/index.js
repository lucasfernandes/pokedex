/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import Header from 'pages/components/Header';
import Details from 'pages/details';
import List from 'pages/list';
import './styles.css';

const renderDetails = (data, open) => (
  data.length !== 0 && open && <Details />
);

const Main = ({ search, open, loading }) => (
  <div>
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
    data: PropTypes.arrayOf(PropTypes.shape({})),
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

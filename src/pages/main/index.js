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

const Main = ({ search, open }) => (
  <div className="container">
    {renderDetails(search, open)}
    <Header />
    <List />
  </div>
);

Main.propTypes = {
  search: PropTypes.shape({
    data: PropTypes.shape({}),
  }).isRequired,
  open: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  search: state.search,
  open: state.detailsCard.open,
});

export default connect(mapStateToProps)(Main);

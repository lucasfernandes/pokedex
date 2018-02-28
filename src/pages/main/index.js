/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import Header from 'pages/components/Header';
import Details from 'pages/details';
import './styles.css';

const Main = ({ search }) => (
  <div className="container">
    <Header />

    {search.data.length !== 0 &&
      <Details />}
  </div>
);

const mapStateToProps = state => ({
  search: state.search,
});

Main.propTypes = {
  search: PropTypes.shape({
    data: PropTypes.shape({}),
  }).isRequired,
}

export default connect(mapStateToProps)(Main);

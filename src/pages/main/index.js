/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import Header from 'pages/components/Header';
import Details from 'pages/details';
import List from 'pages/list';

import Loadable from 'react-loading-overlay';

import './styles.css';

const renderDetails = (data, open) => (
  data.length !== 0 && open && <Details />
);

const Main = ({ search, open, loading }) => (

// <Loadable
//   active={isActive}
//   spinner
//   text='Loading your content...'
//   >
//   <p>Some content or children or something.</p>
// </Loadable>

  <Loadable
    active={loading}
    spinner
    text="Loading your content"
  >
    <div className="container">
      {renderDetails(search, open)}
      <Header />
      <List />
    </div>
  </Loadable>
);

Main.propTypes = {
  search: PropTypes.shape({
    data: PropTypes.shape({}),
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

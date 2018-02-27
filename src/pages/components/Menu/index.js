/* Core */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* Presentational */

/* Redux */
import { connect } from 'react-redux';
import MenuActions from '../../../store/ducks/menu';

import './styles.css';

const slideToogle = () => {
  console.tron.log('chamando o menu');
};

const Menu = () => (
  <div>asdf</div>
);


const mapStateToProps = state => ({
  menu: state.menu,
});

const mapDispatchToProps = dispatch => ({
  menuClose: () => dispatch(MenuActions.menuClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

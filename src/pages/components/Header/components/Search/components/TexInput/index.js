/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import './styles.css';

const toogleStyle = error => (
  error ? 'error textInput' : 'textInput'
);

const TextInput = props => (
  <input
    type="text"
    className={toogleStyle(props.error)}
    {...props}
  />
);

TextInput.propTypes = {
  error: PropTypes.bool.isRequired,
};

export default TextInput;

/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import './styles.css';

const toogleStyle = error => (
  error === 'true' ? 'error textInput' : 'textInput'
);

const TextInput = props => (
  <input
    type="text"
    className={toogleStyle(props.error)}
    {...props}
  />
);

TextInput.propTypes = {
  error: PropTypes.string.isRequired,
};

export default TextInput;

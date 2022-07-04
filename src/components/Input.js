import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { textLabel, type, id, name, value, dataTestid, handleChange } = this.props;
    return (
      <label
        htmlFor={ id }
        className="flex flex-col text-purple-900 font-bold text-center"
      >
        { textLabel }
        <input
          className="border border-1 border- rounded p-1"
          name={ name }
          id={ id }
          type={ type }
          value={ value }
          onChange={ handleChange }
          data-testid={ dataTestid }
        />
      </label>
    );
  }
}

Input.propTypes = {
  textLabel: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default Input;

import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button
      className="btn"
      id={`btn-${props.color}`}
      onClick={() => { props.onClick(props.color); }}
    />
  );
}

Button.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;

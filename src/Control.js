import React from 'react';
import PropTypes from 'prop-types';

function Control(props) {
  return (
    <div className="control">
      <button className="btn-control" onClick={props.onClick}>
            Start/Stop Game
      </button>
      <label id="checkbox-label" htmlFor="checkbox">Strict Mode
            <input id="checkbox" type="checkbox" onChange={props.onChange} />
      </label>
    </div>
  );
}

Control.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Control;

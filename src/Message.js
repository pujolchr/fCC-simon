import React from 'react';
import PropTypes from 'prop-types';

function Message(props) {
  if (props.playing) {
    return (
      <div>
        <p className="message">
          You played {props.good} notes of {props.total}.
        </p>
      </div>
    );
  }

  if (props.winLastGame) {
    return (
      <div>
        <p className="message">
          {'You win!! play again?'}
        </p>
      </div>
    );
  }
  return null;
}

Message.propTypes = {
  good: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
  winLastGame: PropTypes.bool.isRequired,
};

export default Message;

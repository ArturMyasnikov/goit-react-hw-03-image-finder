import React from 'react';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
  onKeyHandle = e => {
    if (e.code === 'Escape') {
      this.props.onModalToggle();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyHandle);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyHandle);
  }

  render() {
    return (
      <div
        onClick={e => {
          if (e.target.classList.contains('overlay')) {
            this.props.onModalToggle();
          }
        }}
        className="overlay"
      >
        <div className="modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  showModal: PropTypes.func,
  onModalToggle: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};

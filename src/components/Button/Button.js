import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    if (
      this.props.photo !== null &&
      this.props.photo.length !== 0 &&
      this.props.page !== 50 &&
      this.props.page <= this.props.totalHits / 12
    ) {
      return (
        <button
          onClick={this.props.incrementPage}
          className="button"
          type="button"
        >
          Load more
        </button>
      );
    }
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { Triangle } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    photo: [],
    totalHits: '',
    showModal: false,
    largeImageURL: null,
    loading: false,
  };

  onModalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  showLargeImage = event => {
    this.onModalToggle();

    const photoIndex = event.target.getAttribute('name');
    const url = this.state.photo[photoIndex].webformatURL;
    this.setState({
      largeImageURL: url,
    });
  };

  fetchPhoto = async () => {
    const res = await fetch(
      `https://pixabay.com/api/?q=${this.props.name}&page=${this.props.page}&key=28717517-f64785f1a0bcfad607225ab19&image_type=photo&orientation=horizontal&per_page=12`
    );
    return await res.json();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({ loading: true });
      return this.fetchPhoto()
        .then(data =>
          this.setState({
            photo: [...data.hits],
            totalHits: data.totalHits,
            loading: false,
          })
        )
        .finally(() => this.setState({ loading: false }));
    }

    if (prevProps.page !== this.props.page) {
      this.setState({ loading: true });
      return setTimeout(
        () =>
          this.fetchPhoto()
            .then(data =>
              this.setState({ photo: [...prevState.photo, ...data.hits] })
            )
            .finally(() => this.setState({ loading: false })),
        0
      );
    }
  }

  render() {
    return (
      <>
        <ul className="imageGallery">
          {this.state.loading && (
            <Triangle
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClassName="loader"
              visible={true}
            />
          )}
          {this.state.showModal && (
            <Modal
              showModal={this.state.showModal}
              onModalToggle={this.onModalToggle}
              largeImageURL={this.state.largeImageURL}
            />
          )}
          {this.state.photo &&
            this.state.photo.map((photo, index) => {
              return (
                <li
                  key={photo.webformatURL}
                  onClick={this.showLargeImage}
                  className="imageGalleryItem"
                >
                  <img
                    name={index}
                    className="imageGalleryItem-image"
                    src={photo.webformatURL}
                    alt={photo.tags}
                  />
                </li>
              );
            })}
        </ul>
        <Button
          incrementPage={this.props.incrementPage}
          page={this.props.page}
          photo={this.state.photo}
          totalHits={this.state.totalHits}
        />
      </>
    );
  }
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  incrementPage: PropTypes.func,
};

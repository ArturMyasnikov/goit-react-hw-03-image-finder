import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    name: '',
    page: 1,
    photo: [],
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSubmit = event => {
    event.preventDefault();
    const searchName = event.currentTarget.name.value;
    if (searchName === this.state.name || searchName === '') {
      return;
    }

    this.setState({
      name: searchName,
      page: 1,
      photo: [],
    });
  };

  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          name={this.state.name}
          incrementPage={this.incrementPage}
          page={this.state.page}
        />
      </div>
    );
  }
}

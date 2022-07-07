import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favorited: false,
    };
  }

  componentDidMount() {
    this.alreadyFavorited();
  }

  alreadyFavorited = () => {
    const { musicInfo, favoriteMusics } = this.props;
    const isFavorite = favoriteMusics.some(
      ({ trackId }) => trackId === musicInfo.trackId,
    );
    this.setState({
      favorited: isFavorite,
    });
  }

  handleFavoritize = async ({ target }) => {
    const { musicInfo } = this.props;
    // console.log(musicInfo);
    this.setState({
      isLoading: true,
    });
    if (target.checked) {
      await addSong(musicInfo);
      this.setState({
        favorited: true,
        isLoading: false,
      });
    } else {
      await removeSong(musicInfo);
      this.setState({
        favorited: false,
        isLoading: false,
      });
    }
  }

  render() {
    const { isLoading, favorited } = this.state;
    const { trackName, previewUrl, artwork, trackId } = this.props;
    return (
      <div>
        <h4>{trackName}</h4>
        <img src={ artwork } alt="artwork" />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        {isLoading ? <Loading /> : (
          <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              name="favorita"
              id={ trackId }
              onChange={ this.handleFavoritize }
              checked={ favorited }
            />
          </label>)}

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  artwork: PropTypes.string.isRequired,
  musicInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  favoriteMusics: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackImg: PropTypes.string,
  })).isRequired,
};

export default MusicCard;

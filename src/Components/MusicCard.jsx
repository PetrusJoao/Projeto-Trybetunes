import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorited: false,
      isLoading: false,
    };
  }

  handlerFavoriteSong = async ({ target }) => {
    const { trackName, previewUrl, trackId } = this.props;
    this.setState({
      isLoading: true,
    });
    if (target.checked) {
      await addSong(trackName, previewUrl, trackId);
      this.setState({
        favorited: true,
        isLoading: false,
      });
    } else {
      await removeSong(trackName, previewUrl, trackId);
      this.setState({
        isLoading: false,
        favorited: false,
      });
    }
  }

  render() {
    const { isLoading, favorited } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        {isLoading ? <Loading />
          : (
            <label htmlFor={ trackId }>
              {' '}
              Favorita
              <input
                type="checkbox"
                id={ trackId }
                name={ trackId }
                onChange={ this.handlerFavoriteSong }
                checked={ favorited }
                data-testid={ `checkbox-music-${trackId}` }
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
};
export default MusicCard;

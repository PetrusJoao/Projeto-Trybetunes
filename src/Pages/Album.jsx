import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      musics: '',
      getMusicComplete: false,
    };
  }

  async componentDidMount() {
    this.fetchGetMusics();
  }

  fetchGetMusics = async () => {
    const { match } = this.props;
    const { params } = match;
    const getMusic = await getMusics(params.id);
    this.setState({
      artistName: getMusic[0].artistName,
      albumName: getMusic[0].collectionName,
      musics: getMusic.slice(1),
      getMusicComplete: true,
    });
  }

  render() {
    const { artistName, albumName, musics, getMusicComplete } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h1>Album</h1>
          <h2 data-testid="artist-name">
            Artista:
            {' '}
            { artistName }
          </h2>
          <h3 data-testid="album-name">
            Album:
            {' '}
            { albumName }
          </h3>
        </div>
        <div>
          {getMusicComplete ? (
            <div>
              {musics.map((track) => (
                <MusicCard
                  trackName={ track.trackName }
                  previewUrl={ track.previewUrl }
                  trackId={ track.trackId }
                  key={ track.trackNumber }
                />
              ))}
            </div>
          ) : <Loading />}
        </div>
      </div>
    );
  }
}

/* Album.prototype = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}; */

Album.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;

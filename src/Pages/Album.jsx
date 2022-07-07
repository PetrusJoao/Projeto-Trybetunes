import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      musicList: [],
      isLoading: false,
      favoriteMusics: [],
    };
  }

  componentDidMount() {
    this.fetchMusicsApi();
    this.fetchGetFavoriteSongs();
  }

  fetchGetFavoriteSongs = async () => {
    // console.log('iniciei');
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    console.log(favoriteSongs);
    this.setState({
      favoriteMusics: favoriteSongs,
      isLoading: false,
    });
  }

  fetchMusicsApi = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    console.log(musics);
    this.setState({
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
      musicList: musics.slice(1),
    });
  }

  render() {
    const { artistName, albumName, musicList, isLoading, favoriteMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <h1>Album</h1>
            <h2 data-testid="artist-name">{artistName}</h2>
            <h3 data-testid="album-name">
              Album:
              {' '}
              {albumName}
            </h3>
            <div className="music-card-container">
              {musicList.map((track) => (
                <MusicCard
                  key={ track.trackId }
                  trackName={ track.trackName }
                  previewUrl={ track.previewUrl }
                  artwork={ track.artworkUrl100 }
                  trackId={ track.trackId }
                  musicInfo={ track }
                  favoriteMusics={ favoriteMusics }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;

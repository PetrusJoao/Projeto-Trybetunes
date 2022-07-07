import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../Components/Header';
import Loading from '../Components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searched: '',
      btnSearch: true,
      isLoading: false,
      searchComplete: false,
      searchAnswer: [],
    };
  }

  handleInput = ({ target }) => {
    // console.log(target.value);
    const { value, name } = target;
    const minCharacters = 2;
    this.setState(({
      [name]: value,
    }));
    if (value.length >= minCharacters) {
      this.setState(({
        btnSearch: false,
      }));
    } else {
      this.setState(({
        btnSearch: true,
      }));
    }
  }

  handleSearch = async () => {
    const { search } = this.state;
    this.setState(({
      searched: search,
      search: '',
      isLoading: true,
    }));
    const albumsFound = await searchAlbumsAPI(search);
    // console.log(albumsFound);
    this.setState(({
      searchAnswer: albumsFound,
      isLoading: false,
      searchComplete: true,
    }));
    return albumsFound;
  }

  handleShowAnswer = () => {
    const { searchAnswer } = this.state;
    if (!searchAnswer.length) return <p>Nenhum álbum foi encontrado</p>;
    return searchAnswer.map((album) => (
      <li key={ album.collectionId }>
        <Link
          to={ `album/${album.collectionId}` }
          key={ album.collectionId }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          { album.collectionName }
        </Link>
      </li>
    ));
  }

  render() {
    const { search, btnSearch, isLoading, searchComplete, searched } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        {isLoading ? <Loading /> : (
          <form>
            <label htmlFor="search">
              Pesquisa:
              <input
                type="text"
                name="search"
                id="search"
                value={ search }
                onChange={ this.handleInput }
                data-testid="search-artist-input"
              />
            </label>
            <button
              type="button"
              disabled={ btnSearch }
              data-testid="search-artist-button"
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </form>
        )}
        {searchComplete && !isLoading ? (
          <div>
            <h2>
              Resultado de álbuns de:
              {' '}
              { searched }
            </h2>
            { this.handleShowAnswer() }
          </div>
        ) : <h2>Procure por artistas e músicas!</h2>}
      </div>
    );
  }
}

export default Search;

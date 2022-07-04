import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      btnSearch: true,
    };
  }

  handleSearch = ({ target }) => {
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

  render() {
    const { search, btnSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <label htmlFor="search">
            Pesquisa:
            <input
              type="text"
              name="search"
              id="search"
              value={ search }
              onChange={ this.handleSearch }
              data-testid="search-artist-input"
            />
          </label>
          <input
            type="submit"
            value="Pesquisar"
            disabled={ btnSearch }
            data-testid="search-artist-button"
          />
        </form>
      </div>
    );
  }
}

export default Search;

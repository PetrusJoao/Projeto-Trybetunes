import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

handleGetUser = async () => {
  const userInfo = await getUser();
  this.setState(({
    user: [userInfo.name],
    isLoading: false,
  }));
  return userInfo;
}

componentDidMount = () => {
  this.handleGetUser();
}

render() {
  const { user, isLoading } = this.state;
  return (
    <header data-testid="header-component">
      {isLoading ? <Loading />
        : (
          <div data-testid="header-user-name">
            User:
            {' '}
            { user }
            <menu>
              <Link to="/search" data-testid="link-to-search" />
              <Link to="/favorites" data-testid="link-to-favorites" />
              <Link to="/profile" data-testid="link-to-profile" />
            </menu>

          </div>
        )}

    </header>
  );
}
}

export default header;

import React from 'react';
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
          </div>
        )}

    </header>
  );
}
}

export default header;

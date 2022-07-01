import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './Components/Album';
import Favorites from './Components/Favorites';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Search from './Components/Search';
import ProfileEdit from './Components/ProfileEdit';
import NotFound from './Components/NotFound';

class App extends React.Component {
  render() {
    return (
      <div className="Pages-Container">
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route path="/album/:id" component={ Album } />

          <Route path="/favorites">
            <Favorites />
          </Route>

          <Route path="/profile" exact>
            <Profile />
          </Route>

          <Route path="/profile/edit">
            <ProfileEdit />
          </Route>

          <Route path="">
            <NotFound />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;

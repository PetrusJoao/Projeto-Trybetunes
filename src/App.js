import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './Pages/Album';
import Favorites from './Pages/Favorites';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import ProfileEdit from './Pages/ProfileEdit';

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

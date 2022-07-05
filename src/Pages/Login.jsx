import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      btnLogin: true,
      isLoading: false,
      hiddenElement: false,
      redirect: false,
    };
  }

  handleUser = ({ target }) => {
    const { user } = this.state;
    // console.log(target);
    const { value, name } = target;
    const minCharacters = 2;
    this.setState(({
      [name]: value,
    }));
    if (user.length >= minCharacters) {
      this.setState(({
        btnLogin: false,
      }));
    } else {
      this.setState(({
        btnLogin: true,
      }));
    }
  }

 handleCreateUser = async () => {
   //  console.log('entrei');
   const { user } = this.state;
   this.setState(({
     isLoading: true,
     hiddenElement: true,
   }));
   await createUser({ name: user });
   this.setState(({
     isLoading: false,
     redirect: true,
   }));
 }

 render() {
   const { user, btnLogin, isLoading, hiddenElement, redirect } = this.state;
   return (
     <div data-testid="page-login">
       {isLoading ? <Loading /> : ''}
       {redirect && !isLoading ? <Redirect to="/search" /> : ''}
       <div hidden={ hiddenElement }>
         <h1>Login</h1>
         <label htmlFor="name-input">
           <input
             name="user"
             type="text"
             id="name-input"
             data-testid="login-name-input"
             value={ user }
             onChange={ this.handleUser }
           />
         </label>
         <button
           name="btnLogin"
           type="submit"
           id="submit-button"
           data-testid="login-submit-button"
           disabled={ btnLogin }
           onClick={ this.handleCreateUser }
         >
           Entrar
         </button>
       </div>
     </div>
   );
 }
}

export default Login;

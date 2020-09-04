import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { AUTH_TOKEN } from '../constants'
import Navbar from './Navbar'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import Welcome from './Welcome'
import About from './About'
import Footer from './Footer'
import '../styles/App.css'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem(AUTH_TOKEN)
  return <Route {...rest} render={(props) => {
              return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
          }}/>
}

function App() {
  // set state values
  let [currentUser, setCurrentUser] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem(AUTH_TOKEN));
      console.log("DECODING PROCESS:", token)
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem(AUTH_TOKEN)) {
      localStorage.removeItem(AUTH_TOKEN);
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  console.log('Current User', currentUser);
  console.log('Authenicated', isAuthenticated);

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className="container mt-5">
        <Switch>
          <Route path="/signup" component={ Signup } />
          <Route
            path="/login"
            render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>}
          />
          <Route path="/about" component={ About } />
          <PrivateRoute path="/profile" component={ Profile } user={currentUser} />
          <Route exact path="/" component={ Welcome } />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}


export default App;

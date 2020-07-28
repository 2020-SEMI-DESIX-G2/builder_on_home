// import React, { useState, useEffect, useMemo } from "react";
// import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// import { ApolloProvider } from "@apollo/client";
// import { ToastContainer } from "react-toastify";
// import client from "./config/apollo";
// import AuthPage from './pages/Auth';
// import HomePage from './pages/Home';
// import ContractsPage from './pages/Contracts';
// import ServicePage from './pages/Service';
// import ProfilePage from './pages/Profile';
// import MainNavigation from './components/navigation/MainNavigation';
// import FilePage from './components/profile/profilePicture';
// import { getToken, decodeToken, removeToken } from "./utils/token";
// import AuthContext from "./context/auth-context";

// export default function App() {
//   const [auth, setAuth] = useState(undefined);

//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       setAuth(null);
//     } else {
//       setAuth(decodeToken(token));
//     }
//   }, []);

//   const logout = () => {
//     removeToken();
//     setAuth(null);
//   };

//   const setUser = (user) => {
//     setAuth(user);
//   };

//   const authData = useMemo(
//     () => ({
//       auth,
//       logout,
//       setUser,
//     }),
//     [auth]
//   );

//   if (auth === undefined) return null;

//   return (
//     <ApolloProvider client={client}>
//       <AuthContext.Provider value={authData}>
//         {!auth ? <AuthPage /> :
//         <React.Fragment>
//           <MainNavigation />
//           <main className="main-content">
//             <Switch>
//               {!this.state.token && <Redirect from="/" to="/auth" exact />}
//               {this.state.token && <Redirect from="/auth" to="/home" exact />}
//               {!this.state.token && (
//                 <Route path="/auth" component={AuthPage} />
//               )}
//               {this.state.token && (
//                 <Route path="/home" component={HomePage} />
//               )}
//               {this.state.token && (
//                 <Route path="/contracts" component={ContractsPage} />
//               )}
//               {this.state.token && (
//                 <Route path="/service" component={ServicePage} />
//               )}
//               {this.state.token && (
//                 <Route path="/profile" component={ProfilePage} />
//               )}
//               {this.state.token && (
//                 <Route path="/file" component={FilePage} />
//               )}

//             </Switch>
//           </main>
//         </React.Fragment>    
//         }
//       </AuthContext.Provider>
//     </ApolloProvider>
//   );
// }
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';

import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import ContractsPage from './pages/Contracts';
import ServicePage from './pages/Service';
import ProfilePage from './pages/Profile';
import MainNavigation from './components/navigation/MainNavigation';
import FilePage from './components/profile/profilePicture';
import AuthContext from './context/auth-context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
    user: null,
  };

  login = (token, userId, user, tokenExpiration) => {
    this.setState({ token: token, userId: userId, user: user });
  };

  logout = () => {
    this.setState({ token: null, userId: null, user: null });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <React.Fragment>
            <AuthContext.Provider
              value={{
                token: this.state.token,
                userId: this.state.userId,
                user: this.state.user,
                login: this.login,
                logout: this.logout
              }}
            >

              <MainNavigation />
              <main className="main-content">
                <Switch>
                  {!this.state.token && <Redirect from="/" to="/auth" exact />}
                  {this.state.token && <Redirect from="/auth" to="/home" exact />}
                  {!this.state.token && (
                    <Route path="/auth" component={AuthPage} />
                  )}
                  {this.state.token && (
                    <Route path="/home" component={HomePage} />
                  )}
                  {this.state.token && (
                    <Route path="/contracts" component={ContractsPage} />
                  )}
                  {this.state.token && (
                    <Route path="/service" component={ServicePage} />
                  )}
                  {this.state.token && (
                    <Route path="/profile" component={ProfilePage} />
                  )}
                  {this.state.token && (
                    <Route path="/file" component={FilePage}/>
                  )}

                </Switch>
              </main>
            </AuthContext.Provider>
          </React.Fragment>
          <footer className='footer mt-auto py-3 bg-dark text-white'>
            <div className='container'>Place sticky footer content here.</div>
          </footer>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;

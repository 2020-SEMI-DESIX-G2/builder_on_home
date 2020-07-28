// import { createContext } from "react";

// const AuthContext = createContext({
//   user: undefined,
// });

// export default AuthContext;
import React from 'react';
export default React.createContext({
    token: null,
    userID: null,
    user: null,
    login: (token, userID, user, tokenExpiration) => {},
    logout: () => {}
});
//
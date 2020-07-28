import React, { Component } from 'react';

import AuthContext from '../context/auth-context';

import './Auth.css';

class AuthPage extends Component {
    state = {
        isLogin: true
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin };
        });
    };

    submitHandler = event => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
            query {
              login(email: "${email}", password: "${password}") {
                userId
                token
                tokenExpiration
                user{
                    name
                    type
                }
              }
            }
          `
        };

        if (!this.state.isLogin) {
            requestBody = {
                query: `
              mutation{
                addUser(
                    email: "${email}", password: "${password}"
                ){
                  id
                  name
                  direction
                  email
                  phone_number
                  password
                  type
                }
              }
              
            `
            };
        }

        console.log(requestBody);
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                // console.log(resData.data.login.userId);
                if (resData.data.login != null) {
                    if (resData.data.login.token) {
                        // console.log('user name ' + Object.keys(resData.data.login.user));
                        this.context.login(
                            resData.data.login.token,
                            resData.data.login.userId,
                            resData.data.login.user,
                            resData.data.login.tokenExpiration
                        );
                    }
                }

            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form className="form-signin" onSubmit={this.submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" type="email" id="email" ref={this.emailEl} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input className="form-control" type="password" id="password" ref={this.passwordEl} />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-lg btn-success" type="submit">Submit</button>
                                        <button className="btn btn-lg" type="button" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'signUp' : 'Login'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthPage;
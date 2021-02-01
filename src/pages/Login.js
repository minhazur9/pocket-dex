import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import {useDispatch} from 'react-redux';

import { tokenAuthMutation } from '../queries/accountQueries'
import {logIn} from '../actions';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const [tokenAuth] = useMutation(
        tokenAuthMutation,
        {
            onCompleted({tokenAuth}) {
                if(tokenAuth) {
                    storeToken(tokenAuth)
                }
            }
        }
    )


    const storeToken = (response) => {
        localStorage.setItem('jwtToken',response.token)
        dispatch(logIn())
    }

    const submitForm = (e) => {
        e.preventDefault();
        tokenAuth({
            variables: {
                username: username,
                password: password,
            },
        })
    }

    return (
        <div className="login">
            <form className="login-form" onSubmit={submitForm}>
                <h3>Login</h3>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <button className="waves-effect waves-light btn-large login-submit">LogIn</button>
            </form>
        </div>
    )
}

export default Login
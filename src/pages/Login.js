import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from 'react-apollo';

import { login } from '../queries/accountQueries'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [signIn, { data }] = useLazyQuery(login)

    const submitForm = (e) => {
        e.preventDefault();
        signIn({
            variables: {
                username: username,
                password: password,
            }
        })
        
    }

    return (
        <div className="login">
            <form className="login-form" onSubmit={submitForm}>
                <h3>Login</h3>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
                <button className="waves-effect waves-light btn-large login-submit">LogIn</button>
            </form>
            {data && console.log(data)}
        </div>
    )
}

export default Login
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import { useDispatch } from 'react-redux';

import { tokenAuthMutation } from '../queries/accountQueries'
import { logIn } from '../actions';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const history = useHistory();
    const [invalidcredentials, setInvalidCredientials] = useState(false)

    const [tokenAuth] = useMutation(
        tokenAuthMutation,
        {
            onCompleted({ tokenAuth }) {
                if (tokenAuth) storeToken(tokenAuth)
                else setInvalidCredientials(true)
            }
        }
    )


    const badLoginError = () => {
        return <p className="password-invalid" style={{fontSize:'15px'}}>Invalid username or password</p>
    }

    const storeToken = (response) => {
        const date = new Date();
        date.setTime(date.getTime() + (15*60*1000));
        document.cookie = `jwtToken=${response.token}; expires=${date.toUTCString()}`;
        dispatch(logIn())
        history.push("/")
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
                {invalidcredentials && badLoginError()}
                <label htmlFor="username">Username</label>
                <input type="text" name="username" className="login-input" 
                onFocus={() => setInvalidCredientials(false)} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" className="login-input" name="password" 
                onFocus={() => setInvalidCredientials(false)} onChange={(e) => setPassword(e.target.value)} />
                <button className="waves-effect waves-light btn-large login-submit">LogIn</button>
            </form>
        </div>
    )
}

export default Login
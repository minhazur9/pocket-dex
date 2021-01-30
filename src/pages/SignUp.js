import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { addUserMutation } from '../queries/accountQueries'

const SignUp = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const history = useHistory();

    const submitForm = (e) => {
        e.preventDefault();
        if (password === confirm && password !== "" && confirm !== "") {
            props.addUserMutation({
                variables: {
                    username: username,
                    email: email,
                    password: password,
                }
            }).then((result) => console.log(result))
            // history.push('/')
        }
    }

    // Checks if passwords match
    const passwordCheck = () => {
        if (password !== confirm && password !== "" && confirm !== "") {
            return (
                <>
                <p className="password-invalid">Passwords do not match</p>
                </>
            )
        }
    }

    return (
        <div className="signup">
            <h3>SIGN UP! CREATE YOUR BEST TEAMS!</h3>
            <form className="signup-form" onSubmit={submitForm} >
                <label htmlFor="username">Username</label>
                <input className='signup-input' type="text" name='username' onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input className='signup-input' type="email" name='email' onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input className='signup-input' type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                {passwordCheck()}
                <label htmlFor="confirm">Confirm Password</label>
                <input className='signup-input' type="password" name='confirm' onChange={(e) => setConfirm(e.target.value)} />
                {passwordCheck()}
                <button className="waves-effect waves-light btn-large signup-submit">Signup</button>
            </form>
        </div>
    )
}

export default compose(
    graphql(addUserMutation, { name: "addUserMutation" })
)(SignUp);
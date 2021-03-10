import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-apollo';
import { useDispatch } from 'react-redux';
import { addUserMutation } from '../queries/accountQueries';
import { addTeamMutation, getTeamsQuery } from '../queries/teamQueries';
import { logIn } from '../actions';
import { getCookie } from '../App';

const SignUp = () => {

    const [addUser] = useMutation(
        addUserMutation,
        {
            onCompleted({ addUser }) {
                if (addUser) storeToken(addUser);
            }
        }
    );

    const [addTeam] = useMutation(addTeamMutation)

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [blankUsername, setBlankUsername] = useState(false)
    const [blankPassword, setBlankPassword] = useState(false)
    const [blankEmail, setBlankEmail] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();


    // Stores the JWT in cookie
    const storeToken = (response) => {
        const date = new Date();
        date.setTime(date.getTime() + (12 * 60 * 60 * 1000));
        document.cookie = `jwtToken=${response.token}; Path=/; expires=${date.toUTCString()}`;
        dispatch(logIn())
        history.push('/teams')
    }

    // Submits form to the database
    const submitForm = async (e) => {
        e.preventDefault();
        if (!username) setBlankUsername(true);
        if (!password) setBlankPassword(true);
        if (!email) setBlankEmail(true);
        if (password === confirm && password && confirm && email && username) {
            await addUser({
                variables: {
                    username: username,
                    email: email,
                    password: password,
                }
            })
            addTeam({
                variables: {
                    name: "Team 1",
                    userId: getCookie()
                },
                refetchQueries: [
                    {
                        query: getTeamsQuery,
                        variables: {
                            userId: getCookie()
                        }
                    }
                ]
            })

        }
    }

    // renders blank username error
    const blankUsernameError = () => {
        if (blankUsername) return <p className="error-message">Username is required</p>
    }

    // renders blank password error
    const blankPasswordError = () => {
        if (blankPassword) return <p className="error-message">Password is required</p>
    }

    // renders blank email error
    const blankEmailError = () => {
        if (blankEmail) return <p className="error-message">Email is required</p>
    }

    // renders if password and password confirmation doesn't match
    const passwordVerificationError = () => {
        if (password !== confirm && password !== "" && confirm !== "") {
            return <p className="error-message">Passwords do not match</p>
        }
    }

    // renders if username is too short
    const userNameLengthError = () => {
        if (username.length < 3 && username !== "") {
            return <p className="error-message">Username must be at least 3 characters long</p>
        }
    }

    return (
        <div className="signup">
            <h3>SIGN UP! CREATE YOUR BEST TEAMS!</h3>
            <form className="signup-form" onSubmit={submitForm} >
                <label htmlFor="username">Username</label>
                <input className='signup-input' type="text" name='username'
                    onFocus={() => setBlankUsername(false)} onChange={(e) => setUsername(e.target.value)} />
                {userNameLengthError()}
                {blankUsernameError()}
                <label htmlFor="email">Email</label>
                <input className='signup-input' type="email" name='email'
                    onFocus={() => setBlankEmail(false)} onChange={(e) => setEmail(e.target.value)} />
                {blankEmailError()}
                <label htmlFor="password">Password</label>
                <input className='signup-input' type="password" name='password'
                    onFocus={() => setBlankPassword(false)} onChange={(e) => setPassword(e.target.value)} />
                {passwordVerificationError()}
                {blankPasswordError()}
                <label htmlFor="confirm">Confirm Password</label>
                <input className='signup-input' type="password" name='confirm' onChange={(e) => setConfirm(e.target.value)} />
                {passwordVerificationError()}
                <button className="waves-effect waves-light btn-large signup-submit">Signup</button>
            </form>
        </div>
    )
}

export default SignUp;
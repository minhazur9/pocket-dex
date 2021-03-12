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
                if (addUser.token === 'username already exists') setDuplicateUser(true)
                else if (addUser.token === 'email already exists') setDuplicateEmail(true)
                else if (addUser.token === 'email is invalid') setInvalidEmail(true)
                else storeToken(addUser);
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
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [duplicateUser, setDuplicateUser] = useState(false)
    const [duplicateEmail, setDuplicateEmail] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();


    // Stores the JWT in cookie
    const storeToken = (response) => {
        const date = new Date();
        date.setTime(date.getTime() + (12 * 60 * 60 * 1000));
        document.cookie = `jwtToken=${response.token}; Path=/; expires=${date.toUTCString()}`;
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
        }
    }

    // renders blank username error
    const blankUsernameError = () => {
        return <p className="error-message">Username is required</p>
    }

    const duplicateUserError = () => {
        return <p className="error-message">Username is taken</p>
    }

    // renders blank password error
    const blankPasswordError = () => {
        return <p className="error-message">Password is required</p>
    }

    // renders blank email error
    const blankEmailError = () => {
        return <p className="error-message">Email is required</p>
    }

    const invalidEmailError = () => {
        return <p className="error-message">Email is invalid</p>
    }

    const duplicateEmailError = () => {
        return <p className="error-message">There is already an account using this email</p>
    }

    // renders if password and password confirmation doesn't match
    const passwordVerificationError = () => {
        if (password !== confirm && password !== "" && confirm !== "") {
            return <p className="error-message">Passwords do not match</p>
        }
    }

    // renders if username is too short
    const userNameLengthError = () => {
        return <p className="error-message">Username must be at least 3 characters long</p>
    }

    return (
        <div className="signup">
            <h3>SIGN UP! CREATE YOUR BEST TEAMS!</h3>
            <form className="signup-form" onSubmit={submitForm} >
                <label htmlFor="username">Username</label>
                <input className='signup-input' type="text" name='username'
                    onFocus={() => {
                        setBlankUsername(false)
                        setDuplicateUser(false)
                    }}
                    onChange={(e) => setUsername(e.target.value)} />
                {username && username.length < 3 && userNameLengthError()}
                {blankUsername && blankUsernameError()}
                {duplicateUser && duplicateUserError()}
                <label htmlFor="email">Email</label>
                <input className='signup-input' type="email" name='email'
                    onFocus={() => {
                        setBlankEmail(false)
                        setDuplicateEmail(false)
                        setInvalidEmail(false)
                    }}
                    onChange={(e) => setEmail(e.target.value)} />
                {blankEmail && blankEmailError()}
                {duplicateEmail && duplicateEmailError()}
                {invalidEmail && invalidEmailError()}
                <label htmlFor="password">Password</label>
                <input className='signup-input' type="password" name='password'
                    onFocus={() => setBlankPassword(false)} onChange={(e) => setPassword(e.target.value)} />
                {passwordVerificationError()}
                {blankPassword && blankPasswordError()}
                <label htmlFor="confirm">Confirm Password</label>
                <input className='signup-input' type="password" name='confirm' onChange={(e) => setConfirm(e.target.value)} />
                {passwordVerificationError()}
                <button className="waves-effect waves-light btn-large signup-submit">Signup</button>
            </form>
        </div>
    )
}

export default SignUp;
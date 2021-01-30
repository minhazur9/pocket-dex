import React, { useState } from 'react';

const SignUp = () => {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");


    return (
        <div className="signup">
            <h3>SIGN UP! CREATE YOUR BEST TEAMS!</h3>
            <form className="signup-form">
                <label htmlFor="username">Username</label>
                <input className='signup-input' type="text" name='username' onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="email">Email</label>
                <input className='signup-input' type="email" name='email' onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input className='signup-input' type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="confirm">Confirm Password</label>
                <input className='signup-input' type="password" name='confirm'  onChange={(e) => setConfirm(e.target.value)}/>
                <button className="waves-effect waves-light btn-large signup-submit">Signup</button>
            </form>
        </div>
    )
}

export default SignUp;
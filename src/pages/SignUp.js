import React from 'react';

const SignUp = () => {
    return (
        <div className="signup">
            <h3>SIGN UP! CREATE YOUR BEST TEAMS!</h3>
            <form className="signup-form">
                <label htmlFor="username">Username</label>
                <input className='signup-input' type="text" name='username' />
                <label htmlFor="email">Email</label>
                <input className='signup-input' type="text" name='email' />
                <label htmlFor="password">Password</label>
                <input className='signup-input' type="text" name='password' />
                <label htmlFor="confirm">Confirm Password</label>
                <input className='signup-input' type="text" name='confirm' />
                <button className="waves-effect waves-light btn-large signup-submit">Signup</button>
            </form>
        </div>
    )
}

export default SignUp;
import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { logOut } from '../actions';

const Navbar = () => {

  const loggedIn = useSelector(state => state.loggedIn)
  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    const date = new Date();
    date.setTime(date.getTime() - 1000*60);
    document.cookie = `jwtToken=; expires=${date.toUTCString()}`;
    dispatch(logOut())
    history.push('/')
  }

  // Toggles dropdown menu
  const dropdown = () => {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown.style.display === 'none' || !dropdown.style.display) {
      dropdown.style.animationName = 'slideDown'
      dropdown.style.display = 'block'
    }
    else {
      dropdown.style.display = 'none'
    }
  }

  return (
    <nav>
      <div className="nav-wrapper red">
        <Link to="/" onClick={() => document.querySelector('.dropdown').style.display = 'none'} className="brand-logo left">PocketDex</Link>
        <ul id="nav-mobile" className="right">
          <li><Link to="/pokemon" className="nav-link">PokeDex</Link></li>
          <li><Link to="/moves" className="nav-link">MoveDex</Link></li>
          <li><Link to="/abilities" className="nav-link">AbilityDex</Link></li>
          <li><Link to="/items" className="nav-link">ItemDex</Link></li>
          {loggedIn ?
            <li className='sign-out'><button to="/" className="nav-link" onClick={signOut}>Logout</button></li> :
            <>
              <li><Link to="/signup" className="nav-link">Signup</Link></li>
              <li><Link to="/login" className="nav-link">Login</Link></li>
            </>

          }
        </ul>
        <button onClick={dropdown} className="hamburger-menu">
          <div></div>
          <div></div>
          <div></div>
        </button>
      </div>
      <ul className="dropdown">
        <Link to="/pokemon" onClick={(e) => e.target.parentNode.style.display = 'none'} className="mobile-nav-link"><li>PokeDex</li></Link>
        <Link to="/moves" onClick={(e) => e.target.parentNode.style.display = 'none'} className="mobile-nav-link"><li>MoveDex</li></Link>
        <Link to="/abilities" onClick={(e) => e.target.parentNode.style.display = 'none'} className="mobile-nav-link"><li>AbilityDex</li></Link>
        <Link to="/items" onClick={(e) => e.target.parentNode.style.display = 'none'} className="mobile-nav-link"><li>ItemDex</li></Link>
      </ul>
    </nav>
  )
}

export default Navbar;
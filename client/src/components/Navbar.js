import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { logOut } from '../actions';

const Navbar = () => {

  const loggedIn = useSelector(state => state.loggedIn)
  const dispatch = useDispatch();
  const history = useHistory();

  // Signs the user out
  const signOut = () => {
    const date = new Date();
    date.setTime(date.getTime() - 1000 * 60);
    document.cookie = `jwtToken=; Path=/; expires=${date.toUTCString()}`;
    dispatch(logOut())
    history.push('/')
  }

  // Render the signout button
  const renderSignout = () => {
    return (
      <>
        <li className='nav-link' onClick={signOut}><Link to="/" className="nav-link">Logout</Link></li>
      </>
    )
  }

  // Renders the buttons that only logged in users can use on desktop
  const renderDesktopAccountControls = () => {
    return (
      <>
        <li><Link to="/teams" className="nav-link teams-button">My Teams</Link></li>
      </>
    )
  }

  // Renders the signup and login buttons for desktop
  const renderDesktopAccountLinks = () => {
    return (
      <>
        <li><Link to="/signup" className="nav-link">Signup</Link></li>
        <li><Link to="/login" className="nav-link">Login</Link></li>
      </>
    )
  }


  // Renders the buttons than only logged in users can use on mobile
  const renderMobileAccountControls = () => {
    return (
      <>
        <Link to="/teams" onClick={() => document.querySelector(".dropdown").style.display = "none"} className="mobile-nav-link"><li>My Teams</li></Link>
        <Link to="/" onClick={() => {
          document.querySelector(".dropdown").style.display = "none"
          signOut()
        }}
          className="mobile-nav-link"><li>Logout</li></Link>
      </>
    )
  }

  // Renders the signup and login buttons for mobile
  const renderMobileAccountLinks = () => {
    return (
      <>
        <Link to="/signup" onClick={() => document.querySelector(".dropdown").style.display = "none"} className="mobile-nav-link"><li>Signup</li></Link>
        <Link to="/login" onClick={() => document.querySelector(".dropdown").style.display = "none"} className="mobile-nav-link"><li>Login</li></Link>
      </>
    )
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
        <Link to="/" onClick={() => document.querySelector('.dropdown').style.display = 'none'} className="brand-logo left"><span className="logo-pocket">Pocket</span><span className="logo-dex" >Dex</span></Link>
        <ul id="nav-mobile" className="right">
          <li><Link to="/pokemon" className="nav-link">PokeDex</Link></li>
          <li><Link to="/moves" className="nav-link">MoveDex</Link></li>
          <li><Link to="/abilities" className="nav-link">AbilityDex</Link></li>
          <li><Link to="/items" className="nav-link">ItemDex</Link></li>
          {loggedIn ? renderSignout() : renderDesktopAccountLinks()}
        </ul>
        <ul id="nav-mobile" className="left">
          {loggedIn && renderDesktopAccountControls()}
          {/* <li><Link to="/damagecalc" className="nav-link">Damage Calculator</Link></li> */}
        </ul>
        <button onClick={dropdown} className="hamburger-menu">
          <div></div>
          <div></div>
          <div></div>
        </button>
      </div>
      <ul className="dropdown">
        <Link to="/pokemon" onClick={() => document.querySelector(".dropdown").style.display = "none"} className="mobile-nav-link"><li>PokeDex</li></Link>
        <Link to="/moves" onClick={() => document.querySelector(".dropdown").style.display = "none"} className="mobile-nav-link"><li>MoveDex</li></Link>
        <Link to="/abilities" onClick={() => document.querySelector(".dropdown").style.display = "none"} className="mobile-nav-link"><li>AbilityDex</li></Link>
        <Link to="/items" onClick={() => document.querySelector(".dropdown").style.display = "none"} className="mobile-nav-link"><li>ItemDex</li></Link>
        {loggedIn ? renderMobileAccountControls() : renderMobileAccountLinks()}
      </ul>
    </nav>
  )
}

export default Navbar;
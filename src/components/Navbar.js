import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {

    const dropdown = () => {
      
      
    }
    return (
        <nav>
    <div className="nav-wrapper red">
      <Link to="/" className="brand-logo left">PocketDex</Link>
      <ul id="nav-mobile" className="right">
        <li><Link to="/pokemon" className="nav-link">All Pokemon</Link></li>
      </ul>
      <button onClick={dropdown} className="hamburger-menu">
        <div></div>
        <div></div>
        <div></div>
    </button>
    </div>
    <ul className="dropdown">
          <li><Link to="/pokemon" className="mobile-nav-link">All Pokemon</Link></li>
        </ul>
  </nav>
    )
}

export default Navbar;
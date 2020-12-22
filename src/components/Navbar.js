import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
    <div className="nav-wrapper red">
      <Link to="/" className="brand-logo left">PocketDex</Link>
      <ul id="nav-mobile" className="right">
        <li><Link to="/pokemon" className="nav-link">All Pokemon</Link></li>
      </ul>
      <button className="hamburger-menu">
        <div></div>
        <div></div>
        <div></div>
    </button>
    </div>
  </nav>
    )
}

export default Navbar;
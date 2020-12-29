import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {

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
      <Link to="/" onClick={() => document.querySelector('.dropdown').style.display='none'} className="brand-logo left">PocketDex</Link>
      <ul id="nav-mobile" className="right">
        <li><Link to="/pokemon" className="nav-link">All Pokemon</Link></li>
        <li><Link to="/moves" className="nav-link">All Moves</Link></li>
      </ul>
      <button onClick={dropdown} className="hamburger-menu">
        <div></div>
        <div></div>
        <div></div>
    </button>
    </div>
    <ul className="dropdown">
      <Link to="/pokemon" onClick={(e) => e.target.parentNode.style.display='none'} className="mobile-nav-link"><li>All Pokemon</li></Link>
      <Link to="/moves" onClick={(e) => e.target.parentNode.style.display='none'} className="mobile-nav-link"><li>All Moves</li></Link>
        </ul>
  </nav>
    )
}

export default Navbar;
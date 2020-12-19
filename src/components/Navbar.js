import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
    <div class="nav-wrapper red">
      <Link to="/" class="brand-logo">PocketDex</Link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><Link to="/pokemon">All Pokemon</Link></li>
      </ul>
    </div>
  </nav>
    )
}

export default Navbar;
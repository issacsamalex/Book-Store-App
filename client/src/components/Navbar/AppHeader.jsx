import React, { useState } from 'react';
import { getImageUrl } from '../../utils';
import menuIcon from '../../assets/nav/menuIcon.png';
import closeIcon from '../../assets/nav/closeIcon.png';
import Brandlogo from '../../assets/logo/book_3145755.png';
import './appHeader.css';
import { useNavigate } from 'react-router-dom';


const AppHeader = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

  return (
    <nav className='navBar'>
      <div className='brand-logo'>
        <img src={Brandlogo} alt="brand-logo" />
        <a className='title' href="/">BookLendr</a>
      </div>
      <div className='menu'>
        <img className='menuIcon' src={menuOpen ? closeIcon : menuIcon} alt="menu-button" onClick={() => setMenuOpen(!menuOpen)} />
        <ul className={`${"menuItems"} ${menuOpen && "menuOpen"}`} onClick={() => setMenuOpen(false)}>
          <button onClick={() => navigate('/signup')} className="primary-btn-menu">Sign up</button>
          <button onClick={() => navigate('/login')} className="secondary-btn-menu">Log in</button>
          <li><a href="#features">Features</a></li>
          <li><a href="#books">Books</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default AppHeader
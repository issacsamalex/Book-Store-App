import React from 'react';
import AppHeader from '../../components/Navbar/AppHeader';
import './welcomePage.css';
import HeroSection from '../../components/Hero/HeroSection';
import Features from '../../components/Features/Features';
import Books from '../../components/Books/Books';
import Contact from '../../components/Contact/Contact';


const WelcomePage = () => {

   
  return (
    <div className='mainLayout'>
        <AppHeader/>
        <HeroSection/>
        <Features/>
        <Books/>
        <Contact/>
    </div>
  )
}

export default WelcomePage
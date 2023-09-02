import React from 'react';

import Navbarv2 from './Navbar_v2';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <Navbarv2 />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
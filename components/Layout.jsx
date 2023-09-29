import React from 'react';

import Navbarv2 from './Navbar_v2';
import Footer from './Footer';
import Box from '@mui/material/Box';

const Layout = ({ children }) => {
  return (
    <div className="layout">
        <Box className="layout-announcement-nav">
          Our platform is currently in BETA environment
        </Box>
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
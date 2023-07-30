import React from 'react';
import { AiFillInstagram} from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="www.elcafecartel.com">
          El Cafe Cartel
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <div className="footer-container">
      {/* <p>2022-23 El Cafe Cartel All rights reserverd</p> */}
      <Copyright/>
      <p className="icons">
        <AiFillInstagram />
        <FaDiscord />
      </p>
    </div>
  )
}

export default Footer
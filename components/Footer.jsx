import React from 'react';
import { AiFillInstagram} from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022-23 El Cafe Cartel All rights reserverd</p>
      <p className="icons">
        <AiFillInstagram />
        <FaDiscord />
      </p>
    </div>
  )
}

export default Footer
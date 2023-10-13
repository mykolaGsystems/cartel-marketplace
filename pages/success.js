import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import Box from '@mui/material/Box';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';
import { useRouter } from 'next/router';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const router = useRouter();

  
  useEffect(() => {
    // localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    // runFireworks();
  }, []);

  useEffect(() => {
    console.log("Order Id: ", router.query.order_id)
  }, [router.query]);

  return (
    <div className="success-wrapper">
      <div className="success">
        {/* <p className="icon">
          <BsBagCheckFill />
        </p> */}
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Your order Id: 
          <Box component="span" sx={{p: 1,  color: "#f02d34", fontWeight: 600}}>
            {router.query.order_id} 
          </Box>
        </p>
        <p className="email-msg">We will be in touch with you shortly!</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="elcafecartel@gmail.com">
            elcafecartel@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success
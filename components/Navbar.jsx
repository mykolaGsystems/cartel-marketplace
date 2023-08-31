import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';
import { VscClose } from 'react-icons/vsc'


import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';

import { useNearContext } from "../context/NearContext"
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import ConnectButton from '../components/ConnectButton'



const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { accountId, signOut, modal } = useNearContext();

  return (
    <header className="navbar">
      <div className="navbar-header-content">
        
      <Link href="/">
        <div className='row'>
          <img src={'../static/ecc_logo_plain.png'} alt="" className='logo-img'></img>
          <VscClose/>
          <img src={'../static/near.png'} alt="" className='logo-img'></img>
        </div>
        </Link>

        <Stack spacing={2} direction="row">
          
          <ConnectButton/>

          <IconButton className="cart-icon" size="medium" onClick={() => setShowCart(true)}>
            <span className="item-count">{totalQuantities}</span>
            <ShoppingCartIcon />
          </IconButton>
        </Stack>
      

        {showCart && <Cart />}      
      
      </div>
    </header>
  )
}

export default Navbar
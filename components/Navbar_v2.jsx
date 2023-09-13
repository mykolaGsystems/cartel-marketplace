import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { VscClose } from 'react-icons/vsc'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNearContext } from "../context/NearContext"
import { useStateContext} from '../context/StateContext';
import { Cart } from '.';
import ConnectButton from './ConnectButton'
import Link from 'next/link';

function ResponsiveAppBar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { accountId, signOut, modal } = useNearContext();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor: "transparent", color: "black"}} elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>

          <Link href="/">
            <Box 
                // component="a"
           
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  alignItems:"center",
                  justifyContent: "center"
                }}
            >
                <img src={'../static/ecc_logo_plain.png'} alt="" className='logo-img'></img>
                {/* <VscClose/>
                <img src={'../static/near.png'} alt="" className='logo-img-near'></img> */}
            </Box>
          </Link>
         

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                "& .MuiMenu-paper": {},
                "& .MuiMenu-list": {padding: "0"}
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
                <ConnectButton/>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Link href="/">
            <Box 
                // component="a"
                
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  alignItems:"center",
                  justifyContent: "center",
                  flexGrow: 200,
                }}
            >
                <img src={'../static/ecc_logo_plain.png'} alt="" className='logo-img'></img>
                {/* <VscClose/>
                <img src={'../static/near.png'} alt="" className='logo-img-near'></img> */}
            </Box>
          </Link>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}, justifyContent: "right", mr: 4}}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}

            <ConnectButton/>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
    
            <IconButton className="cart-icon" size="medium" onClick={() => setShowCart(true)}>
              <span className="item-count">{totalQuantities}</span>
              <ShoppingCartIcon />
            </IconButton>

            {showCart && <Cart />}
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

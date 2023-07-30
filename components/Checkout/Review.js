import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import { useNearContext } from "../../context/NearContext"
import { useStateContext } from '../../context/StateContext'; 
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { urlFor } from '../../lib/client';
import Avatar from "@mui/material/Avatar";

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

export default function Review() {
  const { accountId } = useNearContext();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
  console.log(cartItems, totalPrice, totalQuantities)

  const quantity = (product) => {
    const qty = "Qty: ";
    const field = ` ${qty} ${product.quantity}`;
    return field
  }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
           <ListItemAvatar sx={{marginRight: "20px"}}>
              <Avatar
               alt="Pic" 
               sx = {{
                width: "70px",
                height: "90px",
                borderRadius: "4px !important",
               }}
               src={urlFor(product?.image[0])}
               shape="" />
             </ListItemAvatar>
            <ListItemText primary={product.name} secondary={quantity(product)}/>
            <Typography variant="body2">${product.price} </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          ${ Math.round(totalPrice * 100) / 100} 
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping details
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Typography gutterBottom>NEAR wallet: {accountId}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

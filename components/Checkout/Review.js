import  React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from "react";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useNearContext } from "../../context/NearContext"
import { useStateContext } from '../../context/StateContext'; 
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { urlFor } from '../../lib/client';
import Avatar from "@mui/material/Avatar";
import { useCheckoutContext } from '../../context/CheckoutContext';
import { NearLogo } from '../NearLogo';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NEAR_PRICE_CONTRACT_ADDRESS;

export default function Review() {

  const { accountId, viewMethod, callMethods } = useNearContext();
  // const [ nearTotalPrice, setNearTotalPrice] = React.useState('');
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
  const { firstName,
          lastName,
          email,
          mobile,
          address1,
          address2,
          city,
          state,
          zip,
          country, encrypted ,nearTotalPrice, updateNearTotalPrice } = useCheckoutContext();

// Fetch NEAR Price
  const getServerSideProps = async () => {
      const data = await viewMethod("priceoracle.testnet", "get_asset", { asset_id : "wrap.testnet" });
      const nearPrice = (parseFloat(data["emas"][0]["price"]["multiplier"]) / 100000000).toFixed(8);
      console.log("Current near price", nearPrice);
      updateNearTotalPrice((totalPrice/nearPrice).toFixed(3));
  };

  useEffect(async () => {
    await getServerSideProps();
  }, [totalPrice]);


        
  const renderAddress = () => {
    let addresses = [address1, city, zip, country];
    if(address2 != '') addresses.splice(1, 0, address2);
    if(state != '') addresses.splice(2,0, state);
    return addresses.join(', ')
  };

  const quantity = (product) => {
    const qty = "Qty: ";
    const field = ` ${qty} ${product.quantity}`;
    return field
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
           <ListItemAvatar sx={{marginRight: "20px"}}>
              <img 
                className='checkout-avatar'
                alt="pci"
                src={urlFor(product?.image[0])}
                shape="" 
              />
             </ListItemAvatar>
            <ListItemText primary={product.name} secondary={quantity(product)}/>
            <Typography variant="body2">${product.price} </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Subtotal"/>
            <Typography variant="subtitle1" sx={{fontWeight: 700 }}>
              ${ Math.round(totalPrice * 100) / 100} ~  <NearLogo /> {nearTotalPrice}
            </Typography>
          </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping details
          </Typography>
          <Typography gutterBottom>{firstName} {lastName}</Typography>
          <Typography gutterBottom>{email}</Typography>
          <Typography gutterBottom>{mobile}</Typography>
          {/* <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
          <Typography gutterBottom>{renderAddress()}</Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Typography gutterBottom sx={{fontWeight: "bold", fontSize: "16px"}}> NEAR Wallet: {accountId}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

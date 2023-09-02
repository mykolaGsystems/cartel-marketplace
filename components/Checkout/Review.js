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

import { NearProvider, useNearContext } from "../../context/NearContext"
import { useStateContext } from '../../context/StateContext'; 
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { urlFor } from '../../lib/client';
import Avatar from "@mui/material/Avatar";
import { useCheckoutContext } from '../../context/CheckoutContext';
import { NearLogo } from '../NearLogo';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NEAR_PRICE_CONTRACT_ADDRESS;

export default function Review() {
  const { accountId, viewMethod, callMethods } = useNearContext();

  const [l_nearTotalCheckoutPrice, setLNearTotalCheckoutPrice] = React.useState(0);
  const [nearCoffeePrice, setNearCoffeePrice] = React.useState(0);
  const [l_nearDeliveryPrice, setNearDeliveryPrice] = React.useState(0);
  const [l_totalDeliveryPrice, setTotalDeliveryPrice] = React.useState(0);
  const [l_totalCheckoutPrice, setLTotalCheckoutPrice] = React.useState(0);
  

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
          country, 
          encrypted, 
          deliveryRegion, 
          // totalDeliveryPrice,
          // nearTotalPrice, 
          // nearDeliveryPrice, 
          updateNearTotalPrice, 
          updateTotalDeliveryPrice,
        } = useCheckoutContext();

// Fetch NEAR Price
  const getServerSideProps = async () => {
    const data = await viewMethod("priceoracle.testnet", "get_asset", { asset_id : "wrap.testnet" });
    const nearPrice = (parseFloat(data["emas"][0]["price"]["multiplier"]) / 100000000).toFixed(8);
    console.log("Current near price", nearPrice);   

    let totalGramsPrice = 0
    let totalGrams = 0;
    cartItems.map((product)=> {
      totalGrams = totalGrams + product["size_selected"] * product["quantity"]
    });

    console.log(totalGrams)
    console.log(deliveryRegion)

    let i = 0
    while(totalGrams > 0){
      if(Math.floor(totalGrams / 2000) > 0 ){
        const q = Math.floor(totalGrams / 2000);

        totalGrams = totalGrams - ( q * 2000 ); 
        totalGramsPrice = totalGramsPrice + deliveryRegion["g2000"]["0"]["price"] * q
      } else if (Math.floor(totalGrams / 1000) > 0) {
        const q = Math.floor(totalGrams / 1000);

        totalGrams = totalGrams - ( q * 1000 ); 
        totalGramsPrice = totalGramsPrice + deliveryRegion["g1000"]["0"]["price"] * q
      } else if (Math.floor(totalGrams / 500) > 0) {
        const q = Math.floor(totalGrams / 500);

        totalGrams = totalGrams - ( q * 500 ); 
        totalGramsPrice = totalGramsPrice + deliveryRegion["g500"]["0"]["price"] * q
      };
      console.log("Iter", totalGrams , totalGramsPrice);
    };

    // Update the delivery price;
    updateTotalDeliveryPrice(totalGramsPrice);
    setTotalDeliveryPrice(totalGramsPrice);
    setLTotalCheckoutPrice(totalPrice + totalGramsPrice);

    
    
    // updateNearTotalPrice((totalPrice/nearPrice).toFixed(3));
    setNearCoffeePrice((totalPrice / nearPrice).toFixed(3));
    setNearDeliveryPrice((totalGramsPrice / nearPrice).toFixed(3));
    setLNearTotalCheckoutPrice(((totalPrice + totalGramsPrice) / nearPrice).toFixed(3));
    updateNearTotalPrice(((totalPrice + totalGramsPrice) / nearPrice).toFixed(3));
  };

  // const calculateGRate = () => {
  //   let totalGramsPrice = 0
  //   let totalGrams = 0;
  //   cartItems.map((product)=> {
  //     totalGrams = totalGrams + product["size_selected"] * product["quantity"]
  //   });

  //   console.log(totalGrams)
  //   console.log(deliveryRegion)

  //   let i = 0
  //   while(totalGrams > 0){
  //     if(Math.floor(totalGrams / 2000) > 0 ){
  //       totalGrams = totalGrams - ( Math.floor(totalGrams / 2000) * 2000 ); 
  //       totalGramsPrice = totalGramsPrice + deliveryRegion["g2000"]["0"]["price"]
  //     } else if (Math.floor(totalGrams / 1000) > 0) {
  //       totalGrams = totalGrams - ( Math.floor(totalGrams / 1000) * 1000 ); 
  //       totalGramsPrice = totalGramsPrice + deliveryRegion["g1000"]["0"]["price"]
  //     } else if (Math.floor(totalGrams / 500) > 0) {
  //       totalGrams = totalGrams - ( Math.floor(totalGrams / 500) * 500 ); 
  //       totalGramsPrice = totalGramsPrice + deliveryRegion["g500"]["0"]["price"]
  //     };
  //     console.log("Iter", totalGrams)
  //   };

  //   // Update the delivery price;
  //   updateTotalDeliveryPrice(totalGramsPrice);

  //   console.log("Total Grams:", totalGramsPrice)
  // };

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
        <ListItem sx={{ py:0, paddingTop: 1, px: 0 }}>
          <ListItemText primary="Coffee"/>
          <Typography variant="subtitle1" align="center" sx={{fontWeight: 700 }}>
            ${ Math.round(totalPrice * 100) / 100} ~  <NearLogo /> {nearCoffeePrice}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 0, paddingTop: 0.5,  px: 0 }}>
          <ListItemText primary="Delivery"/>
          <Typography variant="subtitle1" sx={{fontWeight: 700 }}>
            ${ Math.round(l_totalDeliveryPrice * 100) / 100} ~  <NearLogo /> {l_nearDeliveryPrice}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 0.5, paddingBottom: 1,  px: 0 }}>
          <ListItemText primary="Subtotal"/>
          <Typography variant="subtitle1" sx={{fontWeight: 700 }}>
            ${ Math.round(l_totalCheckoutPrice * 100) / 100} ~  <NearLogo  /> {l_nearTotalCheckoutPrice}
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

import React, { useRef } from 'react';
import Link from 'next/link';

import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

import { styled } from "@mui/material/styles";
import { Container, ButtonGroup, Button, TextField } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[50]),
  backgroundColor: blueGrey[50],
  borderColor: blueGrey[200],
  "&:hover": {
    backgroundColor: blueGrey[100],
    borderColor: blueGrey[300]
  }
}));

const StyledInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 0,
      borderColor: blueGrey[200]
    },
    "&:hover fieldset": {
      borderColor: blueGrey[300]
    },
    "&.Mui-focused fieldset": {
      borderColor: blueGrey[500]
    },
    "& input": {
      textAlign: "center",
      width: 45,
      color: blueGrey[700]
    }
  }
});


const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  const handleStripeCheckout = async () => {
    const stripe = await getStripe();

    // const response = await fetch('/api/stripe', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(cartItems),
    // });

    // if(response.statusCode === 500) return;
    
    // const data = await response.json();
    // // console.log(data)

    // toast.loading('Redirecting...');

    // stripe.redirectToCheckout({ sessionId: data.id });
    console.log(cartItems)
  }

  const handleNEARPayment = async () => {
    setShowCart(false)
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">

                  <div> 
                      <h5>{item.name}</h5>
                      <p style={{fontSize: "18px", marginTop: "8px"}}>Size: {item.size_selected}g</p>
                      <p style={{fontSize: "18px", marginTop: "8px"}}>Grind: {item.grind_selected}</p>
                  </div>
               
                  {/* <h5>{item.size_selected}</h5> */}
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <ButtonGroup>
                      <StyledButton
                        onClick={() => toggleCartItemQuanitity(item._id, 'dec') }
                        // disabled={count === 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </StyledButton>
                      <StyledInput size="small" value={item.quantity} />
                      <StyledButton onClick={() => toggleCartItemQuanitity(item._id, 'inc') }>
                        <AddIcon fontSize="small" />
                      </StyledButton>
                    </ButtonGroup>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${ Math.round(totalPrice * 100) / 100}</h3>
            </div>
            <div className="btn-container">
              <button disabled type="button" className="btn" >
                Pay with Stripe (Coming)
              </button>
              <Link href="/checkout">
                <button type="button" className="btn" onClick={handleNEARPayment}>
                  Pay with NEAR 
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
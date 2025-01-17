import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );
  const [totalPrice, setTotalPrice] = useState(
    JSON.parse(localStorage.getItem('totalPrice')) || 0
  );
  const [totalQuantities, setTotalQuantities] = useState(
    JSON.parse(localStorage.getItem('totalQuantities')) || 0
  );
  const [qty, setQty] = useState(
    JSON.parse(localStorage.getItem('qty')) || 1
  );


  let foundProduct;
  let index;

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities));
    localStorage.setItem('qty', JSON.stringify(qty));
  }, [cartItems, totalPrice, totalQuantities, qty]);

  const onAdd = (product, quantity, options) => {

    const product_id = product["_id"] + "_" + product["size_selected"] + "_" + product["grind_selected"];

    const checkProductInCart = cartItems.find((item) => 
      item._id === product_id
      // && 
      // item["size_selected"] === product["size_selected"] && 
      // item["grind_selected"] === product["grind_selected"]
    );
  
    console.log("Added", product);


    
    if(checkProductInCart) {
      setCartItems((cartItems) => 
        cartItems.map((cartProduct) => 
          cartProduct._id === product_id
          // && 
          // cartProduct["size_selected"] === product["size_selected"] && 
          // cartProduct["grind_selected"] === product["grind_selected"]
          ? { ...cartProduct, quantity: cartProduct.quantity + quantity } : cartProduct
        )
      );
      // setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      let new_product = JSON.parse(JSON.stringify(product));
      new_product["_id"] = new_product["_id"] + "_" + new_product["size_selected"] + "_" + new_product["grind_selected"];

      setCartItems(oldArray => [...oldArray, new_product]);
    }

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    toast.success(`${qty} ${product.name} added to the cart.`);

    // const product_id = product["_id"] + "_" + product["size_selected"] + "_" + product["grind_selected"];

    
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);
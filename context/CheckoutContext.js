import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const CheckoutContext = ({ children }) => {
  const [firstName, setFirstName] = React.useState('Mykola');
  const [lastName, setLastName] = React.useState('Gavrysh');
  const [email, setEmail] = React.useState('nick_01@gmail.com');
  const [mobile, setMobile] = React.useState('+4407856179582');
  const [address1, setAddress1] = React.useState('Cosmos Student Apartments RoomA1004');
  const [address2, setAddress2] = React.useState('2 Moore Street');
  const [city, setCity] = React.useState('Sheffield');
  const [state, setState] = React.useState('South Yorkshine');
  const [zip, setZip] = React.useState('S3 7HZ');
  const [country, setCountry] = React.useState('UK');
  const [encrypted, setEncrypted] = React.useState('');
  const [nearTotalPrice, setNearTotalPrice] = React.useState('');
  const [deliveryRegion, setDeliveryRegion] = React.useState('');
  const [totalDeliveryPrice, setTotalDeliveryPrice] = React.useState('');

  // Define individual functions to update each state variable
  const updateNearTotalPrice = (value) => {
    setNearTotalPrice(value);
  };

  const updateTotalDeliveryPrice = (value) => {
    setTotalDeliveryPrice(value);
  };

  const updateEncrypted = (value) => {
    setEncrypted(value);
  };

  const updateFirstName = (value) => {
    setFirstName(value);
  };

  const updateLastName = (value) => {
    setLastName(value);
  };

  const updateEmail = (value) => {
    setEmail(value);
  };

  const updateMobile = (value) => {
    setMobile(value);
  };

  const updateAddress1 = (value) => {
    setAddress1(value);
  };

  const updateAddress2 = (value) => {
    setAddress2(value);
  };

  const updateCity = (value) => {
    setCity(value);
  };

  const updateState = (value) => {
    setState(value);
  };

  const updateZip = (value) => {
    setZip(value);
  };

  const updateCountry = (value) => {
    setCountry(value);
  };

  const updateDeliveryRegion = (value) => {
    setDeliveryRegion(value);
  };

  return (
    <Context.Provider
      value={{
        firstName,
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
        nearTotalPrice,
        deliveryRegion,
        totalDeliveryPrice,
        updateFirstName,
        updateLastName,
        updateEmail,
        updateMobile,
        updateAddress1,
        updateAddress2,
        updateCity,
        updateState,
        updateZip,
        updateCountry,
        updateEncrypted,
        updateNearTotalPrice,
        updateDeliveryRegion,
        updateTotalDeliveryPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCheckoutContext = () => useContext(Context);

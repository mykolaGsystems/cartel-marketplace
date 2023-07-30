import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useCheckoutContext } from '../../context/CheckoutContext';

export default function AddressForm() {
  const [emailError, setEmailError] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');
  const {
    firstName,
    updateFirstName,
    lastName,
    updateLastName,
    email,
    updateEmail,
    mobile,
    updateMobile,
    address1,
    updateAddress1,
    address2,
    updateAddress2,
    city,
    updateCity,
    state,
    updateState,
    zip,
    updateZip,
    country,
    updateCountry,
  } = useCheckoutContext();

  const isEmailValid = (value) => {
    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isMobileValid = (value) => {
    // Phone validation to allow only numbers
    const mobileRegex = /^[0-9]*$/;
    return mobileRegex.test(value);
  };
  
  const handleMobileChange = (event) => {
    const value = event.target.value;
    updateMobile(value);
    // Perform mobile validation here
    if (value && !isMobileValid(value)) {
      setMobileError('Invalid mobile format');
    } else {
      setMobileError('');
    }
  };


  const handleEmailChange = (event) => {
    const value = event.target.value;
    updateEmail(value);
    // Perform email validation here
    if (value && !isEmailValid(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={firstName}
            fullWidth
            autoComplete="given-name"
            onChange={(event) => updateFirstName(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={lastName}
            fullWidth
            autoComplete="family-name"
            onChange={(event) => updateLastName(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={email}
            fullWidth
            autoComplete="given-email"
            onChange={handleEmailChange}
            variant="standard"
            error={!!emailError}
            helperText={emailError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile Number"
            value={mobile}
            fullWidth
            autoComplete="mobile-given"
            onChange={handleMobileChange}
            variant="standard"
            error={!!mobileError}
            helperText={mobileError}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            value={address1}
            fullWidth
            autoComplete="shipping address-line1"
            onChange={(event) => updateAddress1(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            value={address2}
            fullWidth
            autoComplete="shipping address-line2"
            onChange={(event) => updateAddress2(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={city}
            fullWidth
            autoComplete="shipping address-level2"
            onChange={(event) => updateCity(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={state}
            fullWidth
            onChange={(event) => updateState(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={zip}
            fullWidth
            autoComplete="shipping postal-code"
            onChange={(event) => updateZip(event.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={country}
            fullWidth
            autoComplete="shipping country"
            onChange={(event) => updateCountry(event.target.value)}
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

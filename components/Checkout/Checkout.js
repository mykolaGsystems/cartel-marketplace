import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

import { encodeData }  from "../../lib/services";
import { useCheckoutContext } from '../../context/CheckoutContext';
import { useNearContext } from "../../context/NearContext"
import { toast } from 'react-hot-toast';
import { utils } from 'near-api-js'

const steps = ['Shipping address', 'Review your order'];
const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS;

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    // case 1:
    //   return <PaymentForm />;
    case 1:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}



export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { accountId, viewMethod, callMethods } = useNearContext();
  const { firstName, lastName, email, 
          mobile, address1,  address2, 
          city, state, zip, country, updateEncrypted, encrypted, nearTotalPrice } = useCheckoutContext();

  const nearPay = async () => {
    let deposit = utils.format.parseNearAmount(nearTotalPrice.toString());
    let response = await callMethods([
      {
        contractId: MARKETPLACE_ADDRESS,
        methodName: "confirm_purchase",
        args : {
          "encoded_message" : encrypted, "items" : [["1", 1]]
        },
        gas: "250000000000000",
        amount: deposit
      }
    ]);
    console.log(response);
  };

  const handleNext = async () => {
    
    const required = ["FirstName", "LastName", "Email", "MobileNumber",
                      "AddressLine1", "City", "Postcode", "Country"];
    let request = {
      "FirstName": firstName, 
      "LastName": lastName,
      "Email":  email,
      "MobileNumber": mobile,
      "AddressLine1": address1,
      "AddressLine2": address2,
      "City": city,
      "State": state,
      "Postcode": zip,
      "Country": country,
    };

    let validation = true;

    required.forEach((field) => {
      if(request[field] == ''){
        toast.error(`Error. Field ${field} is empty;`);
        validation = false;
      };
    });
    
    if(validation){
      toast.promise(
        encodeData(request)
        .then((response) => {
          updateEncrypted(response);
          console.log("Encrypted Updated");
        }),
         {
           loading: 'Encrypting User Data...',
           success: <b>Encryption successful!</b>,
           error: <b>Could not be encrypted.</b>,
         }
       );
      setActiveStep(activeStep + 1);
    };
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={() => {
                    if(activeStep === steps.length - 1){
                      nearPay();
                    }else {
                      handleNext();
                    }
               
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

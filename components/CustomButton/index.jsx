import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({ children, ...props }) => {
  return (
    <Button
  
            size="medium"
      sx={{
        color: "#484848", border: "1px solid #484848", 
                  fontSize:"14px", fontWeight: "bold",
              '&:hover': {
                borderColor: '#484848',
                boxShadow: 'none',
                color: "#484848", 
                border: "1px solid #484848"
              },
        ...props.sx, // Merge any additional styles passed as props
      }}
      {...props} // Spread any other props, like onClick or disabled
    >
      {children}
    </Button>
  );
};

export default CustomButton;
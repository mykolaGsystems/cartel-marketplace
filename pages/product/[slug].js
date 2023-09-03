import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import { Container, ButtonGroup, Button, TextField } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import DoneIcon from '@mui/icons-material/Done';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { toast } from 'react-hot-toast';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import { useTheme } from '@mui/material/styles';



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

const ProductDetails = ({ product, products }) => {
  const theme = useTheme();
  const { image, name, details, price, size, grind, process, notes, origins, roastDepth, price_per_grams } = product;
  const [index, setIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedGrind, setSelectedGrind] = useState(null);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  const sizeSelect = (event, selected_size) => {
    setSelectedSize(selected_size);
    if(selected_size !== null){
      product["size_selected"] = selected_size["grams"];
      product["price"] = selected_size["price"];
    };
  };

  const grindSelect = (event, selected_grind) => {
    setSelectedGrind(selected_grind);
    product["grind_selected"] = selected_grind;
  };

  const val_onAdd = () => {
    if( selectedGrind == null){
      toast.error("Please select Grind type before continuing");
    } else if ( selectedSize == null) {
      toast.error("Please select Size before continuing");
    } else {
      onAdd(product, qty);
    }
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          {/* <div className="product-details-image-container"> */}
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          {/* </div> */}
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <Typography variant="h5" sx={{ marginTop: "20px", marginBottom: "20px", fontWeight: "bold", fontSize: "26px", color: blueGrey[900]}}>
            ${price}
          </Typography>
          <h4>Size: </h4>
          <Box sx={{ marginBottom: "20px", marginTop:"10px"}}>
            <Stack direction="row" spacing={1}>
              <ToggleButtonGroup
                value={selectedSize}
                exclusive
                onChange={sizeSelect}
              >
                {price_per_grams["stock"].map((obj, i) => 
                  <ToggleButton
                    key={i} 
                    value={obj}
                    sx={{fontSize: "14px",  fontWeight: "bold", 
                        padding: "12px", maxHeight: "35px", 
                        minWidth: "80px", border: "1px solid grey",
                        color: blueGrey[700], textTransform: "lowercase",
                        "&:hover" : {
                          backgroundColor: blueGrey[100],
                          borderColor: blueGrey[300],
                          color: blueGrey[900]
                        },
                        "&.Mui-selected, &.Mui-selected:hover": {
                          color: "white",
                          backgroundColor: blueGrey[600]
                        }
                      }} 
                  >
                    {obj["grams"]}g
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
            </Stack>
          </Box>

          <h4>Grind: </h4>
          <Box sx={{ marginBottom: "20px", marginTop:"10px"}}>
            <Stack direction="row" spacing={1}>
              <ToggleButtonGroup
                  value={selectedGrind}
                  exclusive
                  onChange={grindSelect}
                 
                >
                  {grind.map((obj, i) => 
                    <ToggleButton
                      key={i} 
                      value={obj}
                      sx={{
                          fontSize: "12px", fontWeight: "bold", 
                          padding: "12px", maxHeight: "35px",
                          minWidth: "80px", border: "1px solid grey", 
                          color: blueGrey[700],
                          "&:hover" : {
                            backgroundColor: blueGrey[100],
                            borderColor: blueGrey[300],
                            color: blueGrey[900]
                          },
                          "&.Mui-selected, &.Mui-selected:hover": {
                            color: "white",
                            backgroundColor: blueGrey[600]
                          }
                      }} 
                    >
                      {obj}
                    </ToggleButton>
                  )}
              </ToggleButtonGroup>
            </Stack>
          </Box>

          {/* <div className="quantity"> */}
            <h4>Quantity:</h4>
            <Box sx={{ marginBottom: "20px", marginTop:"10px"}}>
              <ButtonGroup>
                  <StyledButton
                    onClick={decQty}
                    // disabled={count === 1}
                  >
                    <RemoveIcon fontSize="small" />
                  </StyledButton>
                  <StyledInput size="small" value={qty} />
                  <StyledButton onClick={incQty}>
                    <AddIcon fontSize="small" />
                  </StyledButton>
                </ButtonGroup>
            </Box>
           
        
          <h4>Details: </h4>
          <p className='product-input'>{details}</p>

          <Box sx={{ marginBottom: "20px", marginTop:"10px"}}>
            <Box component="div" sx={{ display: 'inline', fontStyle: 'italic' }} >Process:</Box>
            <Stack direction="row"  sx={{display: 'inline', marginLeft: "6px"}} spacing={1}>
        
              {process.map((obj, i) => 
                // <Chip key={i} size="small" variant="filled" sx={{fontSize: "16px", padding: "10px"}} label={obj} />
                <Grid item key={i} xs={6} lg={3} sx={{ display: 'inline' }}>
                <Chip
                  size="small"
                  variant="filled"
                  sx={{ fontSize: '16px', padding: '10px', margin: '6px' }}
                  label={obj}
                />
              </Grid>
              )}
            </Stack>
          </Box>
          <Box sx={{ marginBottom: "20px", marginTop:"10px"}}>
            <Box component="div" sx={{ display: 'inline', fontStyle: 'italic' }} >Notes:</Box>
            <Stack direction="row" sx={{display: 'inline', marginLeft: "6px"}} spacing={1}>
        
              {notes.map((obj, i) => 
                // <Chip key={i} size="small" variant="filled" sx={{fontSize: "16px", padding: "10px"}} label={obj} />
                <Grid item key={i} sx={{display: 'inline'}}>
                  <Chip
                    size="small"
                    variant="filled"
                    sx={{ fontSize: '16px', padding: '10px', margin: '6px' }}
                    label={obj}
                  />
                </Grid>
              )}
            </Stack>
          </Box>
          <Box sx={{ marginBottom: "20px", marginTop:"10px"}}>
            <Box component="div" sx={{ display: 'inline', fontStyle: 'italic' }} >Origins:</Box>
            <Stack direction="row"  sx={{display: 'inline', marginLeft: "6px"}} spacing={1}>
        
              {origins.map((obj, i) => 
                // <Chip key={i} size="small" variant="filled" sx={{fontSize: "16px", padding: "10px"}} label={obj} />
                <Grid item key={i} xs={6} lg={3} sx={{ display: 'inline' }}>
                  <Chip
                    size="small"
                    variant="filled"
                    sx={{ fontSize: '16px', padding: '10px', margin: '6px' }}
                    label={obj}
                  />
                </Grid>
              )}
            </Stack>
          </Box>
          <Box>
            <Box component="div" sx={{ display: 'inline', fontStyle: 'italic' }} >Roast Depth:</Box>
            <Stack direction="row"  sx={{display: 'inline', marginLeft: "6px"}} spacing={1}>    
                <Chip size="small" variant="filled" sx={{fontSize: "16px", padding: "10px"}} label={roastDepth} />
            </Stack>
          </Box>

          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => val_onAdd()} > Add to Cart </button>
            {/* <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)} > Add to Cart </button> */}
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  product["size_selected"] = null;
  product["grind_selected"] = null;

  return {
    props: { products, product }
  }
}

export default ProductDetails
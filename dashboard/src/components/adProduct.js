import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { addProduct } from "../redux/action/productAction";


const AddProduct = () => {
    const navigate=useNavigate()
  const dispatch = useDispatch();
  const theme = createTheme();
const [image, setImage] = React.useState('')
const [name, setName] = React.useState('')
const [price, setPrice] = React.useState(0)
const [countInStock, setcountInStock] = React.useState(0)
const [description, setDescription] = React.useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    // eslint-disable-next-line no-console
    data.append('file',image);
    data.append('name',name);
    data.append('price',price);
    data.append('countInStock',countInStock);
    data.append('rating',5);
    data.append('description', description)
    console.log({

      image: data.get("file"),
    });
    dispatch(
      addProduct(data,navigate)
      
    );
 //console.log(data.get("file"))
  };
  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Product
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="Name"
                label="Name Product"
                name="name"
                autoComplete="no"
                autoFocus
                onChange={(e) =>setName(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="price"
                label="Price"
                type="Number"
                id="price"
                autoComplete="current-password"
                onChange={(e) =>setPrice(e.target.value)}

              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="countInStock"
                label="Quantity"
                type="Number"
                id="countInStock"
                onChange={(e) =>setcountInStock(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="file"
                label="Image"
                type="file"
                id="file"
                onChange={(e) =>setImage(e.target.files[0])}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="description"
                name="description"
                autoFocus
                onChange={(e) =>setDescription(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AddProduct;
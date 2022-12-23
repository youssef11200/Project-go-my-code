import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import Iconify from '../components/iconify';

import { listProduct } from '../redux/action/productAction';
import Loading from '../components/loadingError/Loading';
import Message from '../components/loadingError/Error';
import AddProduct from '../components/adProduct';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function ProductsPage() {
  const dispatch=useDispatch()

  const prods=useSelector((state)=>state.productList)
  console.log(prods)
  const {prds,loading,error}=prods
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  React.useEffect(() => {
    dispatch(listProduct())

  }, [dispatch])

  return (
    <>
      <Helmet>
        <title> Dashboard: Products  </title>
      </Helmet>
      {loading?<Loading/>:error?<Message>{error}</Message>:
          <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <div>
     
      <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Product
          </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
         <AddProduct/>
        </Box>
      </Modal>
    </div>
    </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

      {loading? "":  <ProductList products={prds} />}
        <ProductCartWidget />
      </Container>}
  
    </>
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../redux/action/productAction';
import { useNavigate } from 'react-router-dom';

export default function ShopProductCard({ product }) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handelClick=()=>{
   dispatch(deleteProduct(product._id))
   navigate('/')
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button onClick={handelClick} size="small">Delete</Button>
        <Button size="small">See Details</Button>
       
      </CardActions>
    </Card>
  );
}
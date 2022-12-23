import { useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import Iconify from '../../../components/iconify';
import Loading from '../../../components/loadingError/Loading';
import Message from '../../../components/loadingError/Error';
import { Login } from '../../../redux/action/UserAction';

// ----------------------------------------------------------------------
export default function LoginForm() {

  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogin= useSelector((state)=>state.userLogin)
  const {error,loading,userInfo}=userLogin
  const dispatch=useDispatch()

  const [showPassword, setShowPassword] = useState(false);

  const handleClick=(e)=>{
    e.preventDefault()
    dispatch(Login(email,password))
    if (userInfo) {
      navigate("/dashboard/app")
      
    }
  }
 

  return (
    <div>
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading/> }

      <Stack spacing={3}>
        <TextField 
        name="email" 
        label="Email address"
        value={email}
        onChange={(e)=>(setEmail(e.target.value))} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e)=>(setPassword(e.target.value))}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      </div>
  );
}

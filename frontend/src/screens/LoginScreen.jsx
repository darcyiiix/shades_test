import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import { useLoginMutation } from '../slices/usersApiSlice'

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth)

    const [login, {isLoading}] = useLoginMutation();
    
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect' || '/');

    useEffect(() => {
      if(userInfo){
        navigate(redirect)
      }
    }
    ,[userInfo, redirect, navigate]);


    const submitHandler = async (e) => {
        e.preventDefault();

        try{
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({...res, }));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

  return (
    <div class="">
    <div class="py-6 px-4">
      <div class="">
        <form class="w-5/12 mx-auto">
          <h3 class="text-3xl mb-8">
            Sign in
          </h3>
          <div>
            <input name="email" type="email" autocomplete="email" onChange={(e) => setEmail(e.target.value)} required class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 focus:ring-0 focus:outline-none focus:border-black" placeholder="Email address" />
          </div>
          <div className='mt-8'>
            <input name="password" type="password" autocomplete="current-password" onChange={(e) => setPassword(e.target.value)} required class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 focus:ring-0 focus:outline-none focus:border-black" placeholder="Password" />
          </div>
          <div class="flex items-center justify-between">
          </div>
          <div class="!mt-10">
            <button type="button" onClick={submitHandler} class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-primary hover:bg-primary_dark transition focus:outline-none">
              Log in
            </button>

            <p className="text-sm mt-1 text-center pt-5">Don't have an account <Link to={redirect ? `/register?=${redirect}` : '/register'}> <a class="text-primary font-semibold hover:underline ml-1">Register here</a> </Link> </p>

            { isLoading && <Loader /> }
          </div>

        </form>
      </div>
    </div>


  </div>
  )
}

export default LoginScreen
import React, { useState } from 'react'
import './Login.css'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import {app} from '../firebase';
import { NavLink } from 'react-router-dom';

const Login = ({history}) => {
  const auth = getAuth(app);
  const[form,setForm] = useState({
    email:'user01@email.com',
    pass:'12341234'
  })
  const{email,pass} = form;

  const onChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const onSubmit = (e) =>{
    e.preventDefault();
   signInWithEmailAndPassword(auth,email,pass)
   .then((success)=>{
    alert("로그인 성공!")
    sessionStorage.setItem('email',email);
    history.push('/');
   })
   .catch((error)=>{
    alert("로그인 실패!"+error.message)
   })
  }

  return (
    <div>
      <h1>로그인</h1>
      <form className='login' onSubmit={onSubmit}>
        <input type="text" name='email' value={email} onChange={onChange}/>
        <input type="password" name='pass' value={pass} onChange={onChange}/>
        <button className='button'>로그인</button>
        <NavLink to='/join'><button className='button' style={{marginLeft:'10px'}}>회원가입</button></NavLink>
      </form>
    </div>
  )
}

export default Login
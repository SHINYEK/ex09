import React from 'react'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import Home from './Components/Home'
import Local from './Components/Local'
import Login from './Components/Login'
import Favorite from './Components/Favorite'
import Local2 from './Components/Local2'
import Join from './Components/Join'

const Menu = ({history}) => {
  let email = sessionStorage.getItem('email');
  const style = {
    color:'black'
  }

  const onLogout = (e) =>{
    e.preventDefault();
    sessionStorage.removeItem('email');
    history.push('/');
  }
  return (
    <div>
        <div className='menu'>
            <NavLink to='/' activeStyle={style} exact={true}>Home</NavLink>
            <NavLink to='/local' activeStyle={style}>맛집검색</NavLink>

            <NavLink to='/favorite' activeStyle={style}>즐겨찾기</NavLink>
            {sessionStorage.getItem('email') ? 
              <NavLink to='#' onClick={onLogout}>로그아웃</NavLink>:
              <NavLink to='/login' activeStyle={style} >로그인</NavLink>}
              {email && <span style={{float:'right'}}>{email}님</span>}
            
        </div>

        <Switch>
            <Route path='/' component={Home} exact={true}/>
            <Route path='/local' component={Local}/>
            <Route path='/local2' component={Local2}/>
            <Route path='/favorite' component={Favorite}/>
            <Route path='/login' component={Login}/>
            <Route path='/join' component={Join}/>
        </Switch>
    </div>
  )
}

export default withRouter(Menu)
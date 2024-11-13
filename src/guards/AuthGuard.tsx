import React, { useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';
interface AuthGuardProps extends RouteProps {
    component: React.ComponentType<any>;
    roles : any
  }

const AuthGuard:React.FC<AuthGuardProps>= ({ component: Component, roles, ...rest }) => {
    const { isLoggedIn, userData } = useAuth();
    console.log(userData.user_type);

  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return <Redirect to='/login' />;
      } else if (roles && !roles.includes(parseInt(userData.user_type))) {
        return <Redirect to='/' />;
      }

      return <Component {...props} />;
    }} />
    
  )
}

export default AuthGuard;

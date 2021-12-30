import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { isSessionActive } from '../../services/Sessionservice';

export default function RequireAuth({ children }) {
  
    return isSessionActive()
      ? children
      : <Navigate
          to="/login"
          replace
        />;
  }
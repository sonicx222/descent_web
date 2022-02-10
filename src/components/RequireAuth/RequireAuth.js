import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import * as Page from '../../route/redirects';
import { isloggedin } from '../../services/Loginservice';

export default function RequireAuth({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkin, setCheckin] = useState(true);

  useEffect(() => {
    isloggedin()
      .then((loggedIn) => {
        if (loggedIn) {
          setAuthenticated(true);
        }
        setCheckin(false);
      });
  });

  if ({ checkin }) {
    return null;
  }

  console.log("authenticated", authenticated);
  return (
    authenticated ? children : <Navigate to={Page.LOGIN} replace />
  );
}
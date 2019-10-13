import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import auth from '../../auth';

function PrivateRoute({ component, ...rest }) {
  if (auth.isAuthenticated) {
    return <Route {...rest} render={component} />;
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )}
    />
  );
}

export default PrivateRoute;

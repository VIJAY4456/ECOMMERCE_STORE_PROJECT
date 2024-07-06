import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          element={
            isAuthenticated ? (
              isAdmin && user.role !== "admin" ? (
                <Navigate to="/login" />
              ) : (
                <Component />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;

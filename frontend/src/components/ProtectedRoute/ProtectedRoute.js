import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
      isAuthenticated,
      children,
      adminRoute,
      isAdmin,
      redirect = "/login",
      redirectAdmin = "/account",
}) => {
      if (isAuthenticated === false) {
            return <Navigate to={redirect} />;
      }

      if (adminRoute === true && isAdmin === false) {
            return <Navigate to={redirectAdmin} />;
      }

      return children ? children : <Outlet />;
};

export default ProtectedRoute;
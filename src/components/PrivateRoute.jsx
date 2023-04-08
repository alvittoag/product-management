import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLogin = localStorage.getItem("isLogedin");

  if (!isLogin) {
    return <Navigate to={"/auth"} replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;

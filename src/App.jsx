import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import CreateProducts from "./pages/CreateProducts";
import DetailProduct from "./pages/DetailProduct";
import LandingPage from "./pages/landing-page/LandingPage";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ProductHome from "./pages/ProductHome";

function App() {
  const user = useSelector((state) => state.users.logedinUser);
  const session = localStorage.getItem("isLogedin");

  if (session && !user) {
    Swal.fire({
      title: "Session Telah Berakhir!",
      icon: "error",
      confirmButtonText: "Oke",
    });
    localStorage.removeItem("isLogedin");
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<LandingPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/create-product" element={<CreateProducts />} />
          <Route path="/product/:key" element={<DetailProduct />} />
        </Route>

        <Route path="/product-home/:key" element={<ProductHome />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;

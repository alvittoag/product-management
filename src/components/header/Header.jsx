import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeLanguage } from "../../app/features/languageSlice";
import Swal from "sweetalert2";

const Header = () => {
  const [language, setLanguage] = useState(true);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.users.logedinUser);

  const handleChangeLanguage = () => {
    setLanguage((curr) => !curr);
    dispatch(changeLanguage(language));
  };

  const sessionLogin = localStorage.getItem("isLogedin");

  let nameHead;

  if (sessionLogin) {
    nameHead = `Hi ,
      ${userLogin}
    `;
  } else {
    nameHead = "Simple Header";
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLogedin");
    navigate("/");
    Swal.fire({
      title: "Logout Berhasil",
      icon: "success",
      confirmButtonText: "Oke",
    });
  };

  return (
    <header>
      <nav className="flex justify-between items-center px-3 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <Link to={"/"}>
          <h1 className="text-2xl font-semibold">{nameHead}</h1>
        </Link>
        <div>
          <div className="flex items-center gap-4 px-4">
            {!sessionLogin && (
              <Link to={"/auth"}>
                <button className="btn btn-info text-slate-800/90 font-semibold px-10">
                  Sign in
                </button>
              </Link>
            )}

            {sessionLogin && (
              <>
                <Link to={"/create-product"}>
                  <button className="btn btn-info text-slate-900 font-semibold ">
                    Create Products
                  </button>
                </Link>
                <button
                  className="btn btn-warning text-slate-900 font-semibold"
                  onClick={handleChangeLanguage}
                >
                  Change Language
                </button>
                <button className="font-bold" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

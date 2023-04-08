import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLogin, addUsersApi } from "../../app/features/usersSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [errorLogin, setErrorLogin] = useState("");

  const users = useSelector((state) => state.users.allUsers);

  const fetchUsers = async () => {
    const url =
      "https://641e64b0ad55ae01cca92934.mockapi.io/create-products/users";

    try {
      const res = await axios.get(url);
      dispatch(addUsersApi(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    users.find((user) => {
      if (user.email === data.email && user.password === data.password) {
        navigate("/create-product");

        localStorage.setItem("isLogedin", true);
        Swal.fire({
          title: "Login Berhasil",
          icon: "success",
          confirmButtonText: "Oke",
        });

        dispatch(addLogin(user.username));
      } else {
        setErrorLogin("Email Atau Password Salah");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10 mb-10 flex flex-col justify-center w-96 mx-auto gap-3">
        <label htmlFor="email" className=" text-slate-800">
          Email
        </label>
        <input
          type="text"
          {...register("email")}
          name="email"
          className="ring-1 ring-gray-300 py-1 px-2 rounded-md"
        />
        <p className="text-red-700">{errors?.email?.message}</p>

        <label htmlFor="password" className=" text-slate-800">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          name="password"
          className="ring-1 ring-gray-300 py-1 px-2 rounded-md"
        />
        <p className="text-red-700">{errors?.password?.message}</p>

        {errorLogin && <p className="text-red-600">{errorLogin}</p>}

        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-white font-semibold mt-4 rounded-lg"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;

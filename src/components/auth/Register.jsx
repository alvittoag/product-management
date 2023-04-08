import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addRegister } from "../../app/features/usersSlice";

const Register = ({ setActive }) => {
  const dispatch = useDispatch();

  const schema = yup.object({
    firstName: yup.string().required().min(3),
    lastName: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Password Do Not Match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const url =
      "https://641e64b0ad55ae01cca92934.mockapi.io/create-products/users";

    axios.post(url, {
      email: data.email,
      firstname: data.firstName,
      lastname: data.lastName,
      username: data.username,
      password: data.password,
    });
    dispatch(addRegister(data));

    alert("Berhasil Registrasi");

    setActive("Login");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10 mb-10 flex flex-col justify-center w-96 mx-auto gap-3">
        <label htmlFor="firstName" className=" text-slate-800">
          First Name
        </label>
        <input
          type="text"
          {...register("firstName")}
          name="firstName"
          className="ring-1 ring-gray-300 py-1 px-2 rounded-md"
        />
        <p className="text-red-700">{errors?.firstName?.message}</p>

        <label htmlFor="lastName" className=" text-slate-800">
          Last Name
        </label>
        <input
          type="text"
          {...register("lastName")}
          name="lastName"
          className="ring-1 ring-gray-300 py-1 px-2 rounded-md"
        />
        <p className="text-red-700">{errors?.lastName?.message}</p>

        <label htmlFor="username" className=" text-slate-800">
          Username
        </label>
        <input
          type="text"
          name="username"
          className="ring-1 ring-gray-300 py-1 px-2 rounded-md"
          {...register("username")}
        />

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

        <label htmlFor="confirmPassword" className=" text-slate-800">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          name="confirmPassword"
          className="ring-1 ring-gray-300 py-1 px-2 rounded-md"
        />
        <p className="text-red-700">{errors?.confirmPassword?.message}</p>

        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 text-white font-semibold mt-4 rounded-lg"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;

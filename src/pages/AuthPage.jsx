import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login, Register } from "../components";

const data = [{ name: "Login" }, { name: "Register" }];

const Registrasi = () => {
  const [active, setActive] = useState("Login");

  return (
    <div className="flex justify-center h-full items-center mt-20 mb-20">
      <div className="ring-1 ring-gray-200 rounded-md w-[30rem]  py-2">
        <div className="flex gap-20 mt-4 justify-center">
          {data.map((d) => (
            <button
              onClick={() => setActive(d.name)}
              key={d.name}
              className={` ${
                active === d.name
                  ? "text-white font-semibold px-14 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  : "font-semibold text-slate-700"
              } `}
            >
              {d.name}
            </button>
          ))}
        </div>
        <hr className="mt-4" />
        {active === "Register" && <Register setActive={setActive} />}
        {active === "Login" && <Login />}
      </div>
    </div>
  );
};

export default Registrasi;

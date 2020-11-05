import React, { useState, useEffect } from "react";
import axios from "axios";
import { urlApiMain } from "../../utils/url/";
import { Auth, history } from "../../config";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(user);
  };

  const LoginUser = () => {
    axios
      .post(`${urlApiMain}login`, user)
      .then((res) => {
        const now = new Date();
        Auth.setToken(
          res.data.token.original.token,
          res.data.id_user,
          now.getDate() + 1,
          now.getMonth()
        );
        history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 h-64">
          <div className="bg-white px-8 pt-6 pb-8 mb-4 rounded overflow-hidden shadow-lg">
            <div className="mb-4">
              <label className="bloc text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => onInputChange(e)}
                placeholder="example@example.net"
              />
            </div>
            <div className="mb-6">
              <label className="bloc text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                onChange={(e) => onInputChange(e)}
                placeholder="********"
              />
            </div>
            <div className="flex">
              <button
                onClick={LoginUser}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline focus:shadow-outline flex-1"
                type="button"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Login Failed");

    }
  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl w-[420px]">

        <h1 className="text-5xl font-bold text-cyan-400 mb-3">
          Smart CRM
        </h1>

        <p className="text-slate-400 mb-8">
          Login to continue
        </p>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all rounded-2xl p-4 font-semibold"
          >
            Login
          </button>

          <p className="text-slate-400 text-center">

            No account?

            <Link
              to="/register"
              className="text-cyan-400 ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
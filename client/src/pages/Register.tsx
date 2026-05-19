import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async () => {

      try {

        await API.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

        navigate("/");

      } catch (error) {

        alert(
          "Registration Failed"
        );

      }
    };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl w-[420px]">

        <h1 className="text-5xl font-bold text-cyan-400 mb-3">
          Register
        </h1>

        <p className="text-slate-400 mb-8">
          Create your account
        </p>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white outline-none"
          />

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
            onClick={handleRegister}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all rounded-2xl p-4 font-semibold"
          >
            Register
          </button>

          <p className="text-slate-400 text-center">

            Already have account?

            <Link
              to="/"
              className="text-cyan-400 ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;
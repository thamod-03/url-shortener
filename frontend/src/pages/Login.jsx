import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppContent } from "../context/AppContent";
import { supabase } from "../context/supabase-client";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AppContent);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    user && navigate("/");
  });

  const handleLogin = async (e) => {
    e.preventDefault;

    if (!user) {
      await login(email, password);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="lg:text-2xl md:text-xl">Login to your Account</h1>
      <form className="flex gap-4 flex-col items-center" action={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            className="border-2 rounded-sm p-2"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            className="border-2 rounded-sm p-2"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md mt-4"
            value="Login"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

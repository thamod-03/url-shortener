import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppContent } from "../context/AppContent";
import { supabase } from "../context/supabase-client";

const Register = () => {
  const navigate = useNavigate();
  const { user, register } = useContext(AppContent);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault;
    if (password === confirmPassword) {
      register(email, password);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("Check your email for verification")
    }
  };

  useEffect(() => {
    user && navigate("/");
  });

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="lg:text-2xl md:text-xl">Create an Account</h1>
      <form
        className="flex gap-4 flex-col items-center"
        action={handleRegister}
      >
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
          <label>Confirm Password</label>
          <br />
          <input
            className="border-2 rounded-sm p-2"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {confirmPassword !== password && (
          <p>Confirm password and password do not match...</p>
        )}
        <div>
          <input
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md mt-4"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;

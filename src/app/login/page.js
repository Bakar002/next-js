"use client";

import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import "./login.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (params) {
      setError(params.get("error") || "");
      setSuccess(params.get("success") || "");
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <p className="intro-text">
          "Join the adventure! Log in to unlock your gaming potential and dive
          into thrilling challenges that test your skills. New here? Register
          now and start your journey—where every level conquered brings you
          closer to being the ultimate champion!"
        </p>
        <h2 className="subtitle">Sign-In Here</h2>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            required
            className="input"
          />

          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              required
              className="input password-input"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <button className="button">Login</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
        <div className="text-center">
          <p className="text-white">
            Don't have an account?
            <br />
            <Link href="/register" className="text-white">
              Sign Up
            </Link>{" "}
            /
            <Link href="/forgetpass" className="text-white">
              Forget Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginForm />
    </Suspense>
  );
};

export default Login;

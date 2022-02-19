import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import useAuth from "../context/auth";

const Signup: NextPage = () => {
  const { login, error } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(form.email, form.password);
  };

  return (
    <div className="">
      <Head>
        <title>Sign up - Fintech</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="layout h-[100vh] md:border-r">
        <h3 className="font-medium">Login</h3>
        <h5 className="text-gray-500">
          New to here?{" "}
          <Link href="/signup">
            <a className="text-blue-500 hover:underline">
              Sign up for an account
            </a>
          </Link>
        </h5>
        <form onSubmit={submit}>
          <h5 className="mt-10 mb-2 font-medium select-none">Email</h5>
          <input
            type="email"
            className="px-3 py-2 text-sm border border-gray-400 rounded-lg peer w-80 focus:border-gray-500 focus:outline-none"
            placeholder="tim@apple.com"
            name="email"
            onChange={change}
            required
          />
          <h5 className="mt-5 mb-2 font-medium select-none">Password</h5>
          <div className="flex items-center px-3 py-2 mb-2 text-sm border border-gray-400 rounded-lg w-80 focus:border-gray-500">
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full pr-3 focus:outline-none"
              placeholder="..."
              name="password"
              required
              onChange={change}
            />
            {passwordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                className="text-gray-600"
                onClick={() => setPasswordVisible((p) => !p)}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                className="text-gray-600"
                onClick={() => setPasswordVisible((p) => !p)}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M9.342 18.782l-1.931-.518.787-2.939a10.988 10.988 0 0 1-3.237-1.872l-2.153 2.154-1.415-1.415 2.154-2.153a10.957 10.957 0 0 1-2.371-5.07l1.968-.359C3.903 10.812 7.579 14 12 14c4.42 0 8.097-3.188 8.856-7.39l1.968.358a10.957 10.957 0 0 1-2.37 5.071l2.153 2.153-1.415 1.415-2.153-2.154a10.988 10.988 0 0 1-3.237 1.872l.787 2.94-1.931.517-.788-2.94a11.072 11.072 0 0 1-3.74 0l-.788 2.94z"
                />
              </svg>
            )}
          </div>

          <div className="mt-8 mb-10 text-xs text-justify text-gray-600 w-80">
            By login, you agree to the processing of your personal data as
            described in the Privacy Policy.
          </div>
          <button
            type="submit"
            className="block py-2 text-sm transition-all bg-gray-100 rounded-lg w-80 hover:bg-gray-200"
          >
            Login
          </button>
          {error && (
            <div className="flex justify-end mt-2 text-sm text-red-400 w-80">
              * {error ?? ""}
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default Signup;

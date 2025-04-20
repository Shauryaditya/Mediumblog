import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput, signupInputType } from "@shauryadity/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupInputType>({
    email: "",
    password: "",
    name: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("jwtToken", jwt);

      navigate("/blogs");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="">
          <div className="px-10">
            <div className="text-3xl font-extrabold text-slate-900 mt-4">
              Create an account
            </div>
            <div className="text-slate-400 text-sm font-light mt-2">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link
                to={type === "signup" ? "/signup" : "signin"}
                className="pl-2 underline"
              >
                {type === "signup" ? "Sign in" : "Sign up"}
              </Link>
            </div>
          </div>
          <div className="">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                type="text"
                placeholder="John Doe"
                onChange={(e) => {
                  setPostInputs((c) => ({ ...c, name: e.target.value }));
                }}
              />
            ) : null}

            <LabelledInput
              label="Email"
              type="email"
              placeholder="John@example.com"
              onChange={(e) => {
                setPostInputs((c) => ({ ...c, email: e.target.value }));
              }}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPostInputs((c) => ({ ...c, password: e.target.value }));
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface labelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: labelledInputType) {
  return (
    <div className="flex flex-col mt-4">
      <label className="text-sm font-semibold text-slate-900 pb-1">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-slate-200 rounded-md p-2"
      />
    </div>
  );
}

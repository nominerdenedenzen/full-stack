"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { server } from "../../_api/api";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";

const LogIn = () => {
  const router = useRouter();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    if (email === "") {
      setEmailError("Email is required");
      return true;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Required valid email");
      return true;
    } else {
      setEmailError("");
      return false;
    }
  };

  const validatePasword = (password) => {
    if (password === "") {
      setPasswordError("Requires password");
      return true;
    } else {
      setPasswordError("");
      return false;
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const emailErr = validateEmail(formValues.email);
    const passwordErr = validatePasword(formValues.password);

    if (!emailErr && !passwordErr) {
      try {
        const response = await server.post("/auth/login", {
          email: formValues.email,
          password: formValues.password,
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        if (response.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } catch (err) {
        setEmailError(err.response?.data?.message || "Invalid credentials");
      }
    }
  };

  return (
    <div className="min-h-screen text-black bg-white p-6 flex items-center justify-center">
      <div className="flex w-full max-w-[1000px] h-[80vh] items-center justify-between gap-10">
        {/* Left Login Form */}
        <div className="p-6 border border-gray-300 shadow-md rounded-md w-[360px] shrink-0 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-[16px] font-semibold">Log in</h2>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-[14px]">Email</h3>
              <input
                placeholder="you@example.com"
                value={formValues.email}
                name="email"
                type="email"
                onChange={handleInput}
                className="border border-gray-300 rounded-md py-1.5 px-2 placeholder:text-gray-400 text-gray-950 text-sm w-full"
              />
              {emailError && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {emailError}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-[14px]">Password</h3>
              <div className="flex gap-2">
                <input
                  placeholder=""
                  value={formValues.password}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInput}
                  className="border border-gray-300 rounded-md py-1.5 px-2 placeholder:text-gray-400 text-gray-950 text-sm w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="border border-gray-100 rounded-md py-1.5 px-2"
                >
                  {showPassword ? (
                    <EyeClosed className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {passwordError && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {passwordError}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="px-1.5 py-2 bg-black text-white rounded-md mt-2"
            >
              Log in
            </button>
          </div>

          <div className="flex gap-1 text-[12px] justify-center mt-2">
            <span className="text-gray-600">Don't have an account?</span>
            <Link
              href="/sign-up"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign-Up
            </Link>
          </div>
        </div>

        <div className="flex-1 h-full rounded-2xl overflow-hidden">
          <img
            src="/front.png"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;

"use client";

import { useState } from "react";
import { server } from "../../_api/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({ ...formValues, [name]: value });
  };

  const validateEmail = (email) => {
    if (formValues.email === "") {
      setEmailError("Email is required");
      return true;
    } else if (!formValues.email.includes("@")) {
      setEmailError("Required valid email");
      return true;
    } else {
      setEmailError("");
      return false;
    }
  };

  const validatePasswordInput = (password) => {
    if (password === "") {
      setPasswordError("Password is required");
      return true;
    } else if (password.length < 8) {
      setPasswordError("Requires 8 characters");
      return true;
    } else {
      setPasswordError("");
      return false;
    }
  };

  const validateConfirmPasswordInput = (confirmPassword) => {
    if (confirmPassword === "") {
      setConfirmPasswordError("Confirm Password is required");
      return true;
    } else if (formValues.password !== confirmPassword) {
      setConfirmPasswordError("Confirm password must match with password");
      return true;
    } else {
      setConfirmPasswordError("");
      return false;
    }
  };

  const handleSubmit = async () => {
    const emailErr = validateEmail(formValues.email);
    const passwordErr = validatePasswordInput(formValues.password);
    const confirmPasswordErr = validateConfirmPasswordInput(
      formValues.confirmPassword,
    );

    if (!emailErr && !passwordErr && !confirmPasswordErr) {
      setIsSubmitting(true);
      try {
        const response = await server.post("/auth/sign-up", {
          email: formValues.email,
          password: formValues.password,
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        router.push("/admin/dishes");
      } catch (err) {
        console.log(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen text-black bg-white p-6 flex items-center justify-center">
      <div className="flex w-full max-w-[1000px] h-[80vh] items-center justify-between gap-10">
        <div className="p-6 border border-gray-300 shadow-md rounded-md w-[360px] shrink-0 flex flex-col gap-4">
          <div>
            <h2 className="font-semibold text-[16px] mb-3">Create account</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-[14px]">Email</h3>
                <input
                  value={formValues.email}
                  name="email"
                  type="email"
                  placeholder="Enter your email..."
                  onChange={handleInput}
                  className="border border-gray-300 rounded-md py-1.5 px-2 placeholder:text-gray-400 text-gray-950 text-sm w-full"
                />
                {emailError && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {emailError}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-[14px]">Password</h3>
                <div className="flex gap-2">
                  <input
                    value={formValues.password}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password..."
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

              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-[14px]">Confirm Password</h3>
                <div className="flex gap-4">
                  <input
                    value={formValues.confirmPassword}
                    name="confirmPassword"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Confirm your password..."
                    onChange={handleInput}
                    className="border border-gray-300 rounded-md py-1.5 px-2 placeholder:text-gray-400 text-gray-950 text-sm w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2(!showPassword2)}
                    className="border border-gray-100 rounded-md py-1.5 px-2"
                  >
                    {showPassword2 ? (
                      <EyeClosed className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {confirmPasswordError}
                  </div>
                )}
              </div>

              <button
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="px-1.5 py-2 bg-black text-white rounded-md mt-2 disabled:bg-gray-400"
              >
                {isSubmitting ? "Submitting" : "Sign-Up"}
              </button>
            </div>

            <div className="flex gap-1 text-[12px] justify-center mt-4">
              <span className="text-gray-600">Already have an account?</span>
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Log in
              </Link>
            </div>
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

export default Signup;

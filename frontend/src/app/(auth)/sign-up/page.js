"use client";
import { useState } from "react";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
    } else {
      setEmailError("");
      return false;
    }
  };

  const validatePasswordInput = (password) => {
    if (password === "") {
      setPasswordError("Password is required");
      return true;
    } else if (password.length <= 8) {
      setPasswordError("Requires 8 charachters");
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
    } else {
      setConfirmPasswordError("");
      return false;
    }
  };

  const handleSubmit = () => {
    const emailError = validateEmail(formValues.email);
    const passwordError = validatePasswordInput(formValues.password);
    const confirmPasswordError = validateConfirmPasswordInput(
      formValues.confirmPassword,
    );

    if (!emailError && !passwordError && !confirmPasswordError) {
      console.log("we can api");
    }
  };

  return (
    <div className="flex gap-4">
      <div className="rounded-md p-3 ">
        <div>
          <h2 className="font-semibold text-[20px]">Create account</h2>
          <div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-[14px]">Email</h3>
              <input
                placeholder="Enter your email..."
                onChange={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

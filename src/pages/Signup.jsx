import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    //Email validation
    if (!form.email) {
      tempErrors.email = "Email is required!";
      isValid = false;
    }
    //Firstname validation
    if (!form.firstName) {
      tempErrors.email = "First name is required!";
      isValid = false;
    }
    //Lastname validation
    // if (!form.lastName) {
    //   tempErrors.email = "Last name is required!";
    //   isValid = false;
    // }
    // Password validation
    if (!form.password) {
      tempErrors.password = "Password is required!";
      isValid = false;
    } else if (form.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    // Confirm password validation
    if (!form.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required!";
      isValid = false;
    } else if (form.confirmPassword !== form.password) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate
    const isValid = validateForm();

    if (!isValid) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://healthifyme-api.onrender.com/API/users",
        {
          firstname: form.firstName,
          lastname: form.lastName,
          email: form.email,
          password: form.password,
        }
      );
      console.log("Account created successfully:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Account creation failed", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              autoComplete="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className={`block w-full rounded-md border-0 ${
                errors.email && "border-red-500"
              } bg-black/5 py-1.5 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className={`block w-full rounded-md border-0 ${
                errors.firstName && "border-red-500"
              } bg-black/5 py-1.5 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className={`block w-full rounded-md border-0 ${
                errors.lastName && "border-red-500"
              } bg-black/5 py-1.5 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Enter your password"
                className={`block w-full rounded-md border-0 ${
                  errors.password && "border-red-500"
                } bg-black/5 py-1.5 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Confirm password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="password"
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`block w-full rounded-md border-0 ${
                  errors.confirmPassword && "border-red-500"
                } bg-black/5 py-1.5 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md bg-primary hover:bg-primary/70 px-3 py-1.5 text-sm font-semibold leading-6 text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading || !form.email || !form.password}
            >
              {loading ? "Loading..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!form.email) {
      tempErrors.email = "Email is required!";
      isValid = false;
    }

    if (!form.password) {
      tempErrors.password = "Password is required!";
      isValid = false;
    } else if (form.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
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
    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "https://healthifyme-api.onrender.com/API/users/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        window.dispatchEvent(new Event("authChanged"));

        navigate("/my-recipes");
      } else {
        setErrors({ form: "Login failed, please try again." });
      }
    } catch (err) {
      console.error("Login failed", err);
      setErrors({ form: "Invalid email or password." });
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to Your Account
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
            <div className="flex items-center justify-between">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  onClick={() => navigate("/forgot-password")}
                  className="font-semibold text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
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
              {errors.form && (
                <p className="text-red-500 text-sm mt-1">{errors.form}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md bg-primary hover:bg-primary/70 px-3 py-1.5 text-sm font-semibold leading-6 text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-600">
          Not a member?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="font-semibold leading-6 hover:underline cursor-pointer"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Themes from "../components/Themes";

export default function Settings() {
  const [userEdit, setUserEdit] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    profilePicture: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://healthifyme-api.onrender.com/API/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const userId = res.data.userId;
        setId(userId);

        return axios.get(
          `https://healthifyme-api.onrender.com/API/users/${userId}`
        );
      })
      .then((res) => {
        setUserEdit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserEdit((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleEdit = (e) => {
    e.preventDefault();

    axios
      .put(`https://healthifyme-api.onrender.com/API/users/${id}`, userEdit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const event = new Event("authChanged");
        window.dispatchEvent(event);

        navigate(`/profile`);
        console.log("Resource updated successfully", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePasswordEdit = (e) => {
    e.preventDefault();

    if (userEdit.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);

    axios
      .put(`https://healthifyme-api.onrender.com/API/users/${id}`, userEdit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const event = new Event("authChanged");
        window.dispatchEvent(event);

        navigate(`/profile`);
        console.log("Resource updated successfully", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className=" flex flex-col justify-center max-w-screen-md  m-auto min-h-screen   items-center">
        <h1 className="text-4xl font-bold text-primary text-center p-6">
          Settings
        </h1>

        <form
          onSubmit={handleEdit}
          className="flex flex-col flex-1 bg-base-100  px-8 pt-8 pb-14  shadow appearance-none rounded-xl leading-tight"
        >
          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4 text-center p-8">
              Change Your Profile Picture
            </h1>
            <label
              className="block text-xl text-base-content  font-bold mb-2"
              htmlFor="profilePicture"
            >
              Profile Picture
            </label>
            <input
              type="text"
              id="profilePicture"
              name="profilePicture"
              placeholder="Update ProfilePicture Photo URL Here!"
              onChange={handleChange}
              className="shadow border-base-300  focus:ring-2 focus:-ring-accent text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex justify-center gap-6 mt-4">
              <button
                type="submit"
                className="font-bold btn btn-primary text-xl w-full flex-1"
              >
                Change
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4 text-center p-8">
              Change Your Email
            </h1>
            <label
              className="block text-xl text-base-content font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              required
              type="text"
              id="email"
              name="email"
              value={userEdit.email}
              onChange={handleChange}
              className="shadow border-base-300 focus:ring-2 focus:-ring-accent text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex justify-center gap-6 mt-4">
              <button
                type="submit"
                className="font-bold btn btn-primary text-xl w-full flex-1"
              >
                Change
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4 text-center p-8">
              Change Your Password
            </h1>
            <label
              className="block text-xl text-base-content  font-bold mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={userEdit.password}
              onChange={handleChange}
              className="shadow border-base-300  focus:ring-2 focus:-ring-accent text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <label
              className="block text-xl text-base-content  font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="shadow border-base-300  focus:ring-2 focus:-ring-accent text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex justify-center gap-6 mt-4">
              <button
                onSubmit={handlePasswordEdit}
                className="font-bold btn btn-primary text-xl w-full flex-1"
              >
                Change
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4 text-center p-8">
              Change Your Name
            </h1>
            <label
              className="block text-xl text-base-content font-bold mb-2"
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              required
              type="text"
              id="firstname"
              name="firstname"
              value={userEdit.firstname}
              onChange={handleChange}
              className="shadow border-base-300 focus:ring-2 focus:-ring-accent text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              className="block text-xl text-base-content font-bold mb-2"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              required
              type="text"
              id="lastname"
              name="lastname"
              value={userEdit.lastname}
              onChange={handleChange}
              className="shadow border-base-300 focus:ring-2 focus:-ring-accent text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex justify-center gap-6 mt-4">
              <button
                type="submit"
                className="font-bold btn btn-primary text-xl w-full flex-1"
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <Link to={`/profile`} className="flex">
              <button className="font-bold btn btn-error text-xl w-full ">
                Go to your profile
              </button>
            </Link>
          </div>
        </form>
        <div className="container m-auto px-10 lg:px-0 py-12">
          <p className="text-center font-bold text-3xl">
            Select your color theme
          </p>
          <Themes />
        </div>
      </div>
    </>
  );
}

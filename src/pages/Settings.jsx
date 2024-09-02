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
    <div className="min-h-screen bg-base-200">
      <div className=" container m-auto px-10 lg:px-0">
        <h1 className="text-4xl font-bold text-primary text-center pt-16">
          Settings
        </h1>
        <div className="flex flex-col items-center justify-center gap-6 py-12">
          {/*Forms Section*/}
          <div className="flex-1 w-full">
            <form onSubmit={handleEdit} className="flex flex-col gap-8">
              {/*Section 1*/}
              <div className="flex gap-8">
                <div className="flex flex-col flex-1 bg-base-100 px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
                  <h1 className="text-3xl font-bold mb-4 text-center p-8 text-gray-600 ">
                    Change Your Profile Picture
                  </h1>
                  <label
                    className="block  text-xl font-bold mb-2 text-primary"
                    htmlFor="profilePicture"
                  >
                    Profile Picture
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="profilePicture"
                      name="profilePicture"
                      placeholder="Update ProfilePicture Photo URL Here!"
                      onChange={handleChange}
                      className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                    />
                    <button className="btn btn-secondary text-primary font-bold hover:text-secondary hover:btn-primary border-2 border-primary">
                      Upload
                    </button>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <button
                      type="submit"
                      className="font-bold btn btn-secondary text-primary text-xl w-full flex-1 border-2 border-primary hover:text-secondary hover:btn-primary"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className="flex flex-col flex-1 bg-base-100 px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
                  <h1 className="text-3xl font-bold mb-4 text-center p-8 text-gray-600 ">
                    Change Your Name
                  </h1>
                  <label
                    className="block  text-xl font-bold mb-2 text-primary"
                    htmlFor="firstname"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Enter New First Name"
                    onChange={handleChange}
                    className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                  />
                  <label
                    className="block  text-xl font-bold my-2 text-primary"
                    htmlFor="lastname"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter New First Name"
                    onChange={handleChange}
                    className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                  />
                  <div className="flex justify-center gap-6 mt-4">
                    <button
                      type="submit"
                      className="font-bold btn btn-secondary text-primary text-xl w-full flex-1 border-2 border-primary hover:text-secondary hover:btn-primary"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/*Section 2*/}
              <div className="flex gap-8">
                <div className="flex flex-col flex-1 bg-base-100 px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
                  <h1 className="text-3xl font-bold mb-4 text-center p-8 text-gray-600 ">
                    Change Your Email
                  </h1>
                  <label
                    className="block  text-xl font-bold mb-2 text-primary"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter New Email"
                    onChange={handleChange}
                    className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                  />
                  <div className="flex justify-center gap-6 mt-4">
                    <button
                      type="submit"
                      className="font-bold btn btn-secondary text-primary text-xl w-full flex-1 border-2 border-primary hover:text-secondary hover:btn-primary"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
                  <form onSubmit={handlePasswordEdit}>
                    <div className="mb-4 ">
                      <h1 className="text-3xl font-bold mb-4 text-center p-8 text-gray-600 ">
                        Change Your Password
                      </h1>
                      <label
                        className="block  text-xl font-bold mb-2 text-primary"
                        htmlFor="password"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter New Password"
                        onChange={handleChange}
                        className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                      />

                      <label
                        className="block  text-xl font-bold my-2 text-primary"
                        htmlFor="confirm-password"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Repeat New Password"
                        onChange={handleConfirmPasswordChange}
                        className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                      />

                      {error && (
                        <p className="text-error text-sm mt-2">{error}</p>
                      )}

                      <div className="flex justify-center gap-6 mt-4">
                        <button
                          type="submit"
                          className="font-bold btn btn-secondary text-primary text-xl w-full flex-1 border-2 border-primary hover:text-secondary hover:btn-primary"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          </div>

          {/*Themes Section*/}
          <div className="flex flex-col flex-1 w-full bg-base-100 px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
            <h2 className="text-3xl font-bold mb-4 text-center pt-8  text-primary">
              Themes
            </h2>
            <p className="text-center text-lg text-neutral">
              Select your color Theme
            </p>
            <Themes />
          </div>
        </div>
      </div>
    </div>
  );
}

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
  return (
    <>
      <div className=" flex flex-col justify-center max-w-screen-md  m-auto min-h-screen   items-center">
        <h1 className="text-4xl font-bold text-primary text-center p-6">
          Settings
        </h1>

        <div className="container m-auto px-10 lg:px-0 py-12">
          <Themes />
        </div>
        <form
          onSubmit={handleEdit}
          className="flex flex-col flex-1 bg-base-100  px-8 pt-8 pb-14  shadow appearance-none rounded-xl leading-tight"
        >
          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4 text-center p-8">
              Change Profile Picture
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
          </div>

          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4 text-center p-8">
              Change Password
            </h1>
            <label
              className="block text-xl text-base-content  font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              required
              type="text"
              id="password"
              name="password"
              value={userEdit.password}
              onChange={handleChange}
              className="shadow border-base-300  focus:ring-2 focus:-ring-accent text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4 text-center p-8">
              Change Email
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
          </div>

          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4 text-center p-8">
              Change Name
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
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <button
              type="submit"
              className="font-bold btn btn-primary text-xl w-full flex-1"
            >
              Update
            </button>
            <Link to={`/users/${id}`} className="flex-1">
              <button className="font-bold btn btn-error text-xl w-full ">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

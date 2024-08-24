import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/API/users/profile ", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.userId);
        axios
          .get(`http://localhost:8080/API/users/${res.data.userId}`)
          .then((res) => {
            console.log(res.data);
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600">Email: {user.email}</h1>
        <h1 className="text-4xl font-bold text-red-600">
          Name: {user.firstname}
        </h1>
        <h1 className="text-4xl font-bold text-red-600">
          Saved Recipes : {user.savedRecipes}
        </h1>
        <br />
      </div>
      savedRecipes
    </>
  );
}

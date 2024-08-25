import { useEffect, useState } from "react";
import axios from "axios";
import CreatedRecipes from "../components/CreatedRecipes";

export default function Profile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("https://healthifyme-api.onrender.com/API/users/profile ", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        axios
          .get(
            `https://healthifyme-api.onrender.com/API/users/${res.data.userId}`
          )
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
        <CreatedRecipes />
      </div>
    </>
  );
}

import { useEffect } from "react";
import axios from "axios";

export default function Profile() {
  axios
    .get("http://localhost:8080/API/users/profile ", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});

  useEffect(() => {}, []);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600">Profile</h1>
      </div>
    </>
  );
}

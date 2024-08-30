import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

export default function DeleteRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`https://healthifyme-api.onrender.com/API/recipes/${id}`)
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Delete
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

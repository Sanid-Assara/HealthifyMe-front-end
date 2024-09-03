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
        className="bg-error hover:bg-white text-white hover:text-error border-2 border-error hover:border-2  hover:border-error text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
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

import React from "react";

function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white py-6 px-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Confirm Deletion
        </h2>
        <p className="mb-4 text-xl text-primary font-bold">
          Are you sure you want to delete this Recipe?
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="bg-primary hover:bg-secondary text-secondary hover:text-primary border-2 border-primary hover:border-2  hover:border-primary text-lg rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-24 py-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-error hover:bg-white text-white hover:text-error border-2 border-error hover:border-2  hover:border-error text-lg rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-24 py-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

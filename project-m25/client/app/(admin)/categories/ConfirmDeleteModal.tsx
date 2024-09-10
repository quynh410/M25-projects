import React from "react";

export default function ConfirmDeleteModal({ show, onClose, onConfirm }:any) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl mb-4">Bạn có chắc chắn muốn xóa danh mục này?</h2>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-black py-1 px-4 rounded mr-2"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-red-500 text-white py-1 px-4 rounded"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    // Thực hiện hành động đăng xuất
    console.log("User logged out");
    setShowLogoutModal(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div>
      <div className="w-64 h-screen bg-black text-white fixed">
        <div className="flex items-center justify-center mt-10">
          <img
            className="h-16 w-16 rounded-full"
            src="https://e3.365dm.com/22/11/2048x1152/skynews-avatar-water-trailer_5952118.jpg?20221102145501"
            alt="Avatar"
          />
        </div>
        <div className="text-center text-xl mt-4">Admin</div>
        <div className="mt-10">
          <Link href="/dashboard">
            <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Dashboard</p>
          </Link>
          <Link href="/categories">
            <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Quản lý danh mục</p>
          </Link>
          <Link href="/products">
            <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Danh sách sản phẩm</p>
          </Link>
          <Link href="/users">
            <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Quản lý người dùng</p>
          </Link>
          <button
            onClick={handleLogoutClick}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 w-full text-left"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Xác nhận đăng xuất</h2>
            <p>Bạn có chắc chắn muốn đăng xuất không?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Hủy
              </button>
              <Link href="/loginAdmin">
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Đăng xuất
              </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

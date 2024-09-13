"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      router.push("/loginAdmin");
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    console.log("User logged out");
    setShowLogoutModal(false);
    localStorage.removeItem("admin");
    setAdmin(null);
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJhS-Ip_NvxRr9bZiSrFRCeHPB8azuqCIXjA&usqp=CAUhttps://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/7f2366302a6a5fc11d69fc079eaf2f19.jpeg?lk3s=30310797&nonce=13370&refresh_token=14b2fadcf5851214f90fe7b8edeac931&x-expires=1726128000&x-signature=jvw6%2BNpjwazDPeDzi8W20cZh2XU%3D&shp=30310797&shcp=-"
            alt="Avatar"
          />
        </div>
        <div className="text-center text-xl mt-4">Quynh</div>
        <div className="mt-10">
          <a href="/dashboard" className="no-underline">
            <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-white no-underline">
              Dashboard
            </p>
          </a>
          <a href="/categories" className="no-underline">
            <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-white no-underline">
              Quản lý danh mục
            </p>
          </a>
          <a href="/products" className="no-underline">
            <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-white no-underline">
              Danh sách sản phẩm
            </p>
          </a>
          <a href="/users" className="no-underline">
            <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-white no-underline">
              Quản lý người dùng
            </p>
          </a>
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

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  // ----------------------------
  const router = useRouter();
  const cart = useSelector((state: any) => state.cartReducer.cart);
  const handleClick = (id: number) => {
    router.push(`/addToCard/${id}`);
  };
  const account = JSON.parse(localStorage.getItem("account") || "[]");
  const [accounts, setAccounts] = useState(
    JSON.parse(localStorage.getItem("account") || "null")
  );
  const handleLogout = () => {
    localStorage.removeItem("account");
    setAccounts(null);
    router.push("/login"); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  };
  return (
    <>
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-10 text-black h-[70px]">
        <a
          href="/"
          className="ml-8 font-bold text-xl cursor-pointer text-black no-underline"
        >
          MINIMOSA.
        </a>
        <div className="flex gap-16 mr-[40px] font-medium">
          <a href="#" className="text-black no-underline hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-black no-underline hover:text-gray-300">
            Sculpture
          </a>
          <a href="#" className="text-black no-underline hover:text-gray-300">
            Pages
          </a>
          <a href="#" className="text-black no-underline hover:text-gray-300">
            Shop
          </a>
          <a href="#" className="text-black no-underline hover:text-gray-300">
            More
          </a>
        </div>
        <div className="flex gap-4 mr-8">
          <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
          <i className="fa-regular fa-user" onClick={toggleForm}>
            {" "}
            {account ? (
              <b className="font-sans">{account.name}</b>
            ) : (
              <b className="font-sans"></b>
            )}
          </i>

          {isOpen && (
            <div className="absolute mt-[20px] mr-11 p-2 b rounded shadow-lg">
              {account ? (
                <button
                  onClick={handleLogout}
                  className="block no-underline text-black hover:text-gray-200 cursor-pointer"
                >
                  Đăng Xuất
                </button>
              ) : (
                <>
                  <a
                    href="/login"
                    className="block no-underline text-black hover:text-gray-200 cursor-pointer"
                  >
                    Đăng Nhập
                  </a>
                  <a
                    href="/register"
                    className="block no-underline text-black hover:text-gray-200 cursor-pointer"
                  >
                    Đăng Ký
                  </a>
                </>
              )}
            </div>
          )}

          <div className="relative inline-block">
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black rounded-full w-[20px] h-[20px] text-white text-center text-[14px] flex items-center justify-center">
              {cart.length}
            </div>

            <button onClick={() => handleClick(accounts.id)}>
              <i className="fa-solid fa-cart-shopping cursor-pointer text-black"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="py-4 text-sm text-gray-500 text-center bg-gray-200 mt-16">
        <i className="fa-solid fa-house"></i>
        <a href="#" className="hover:underline no-underline text-black ml-2">
          Wish List
        </a>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6">
        <h2 className="text-2xl font-bold mb-4">My Wish List</h2>

        <table className="w-full table-auto mb-6">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Image</th>
              <th className="py-2 text-left">Product Name</th>
              <th className="py-2 text-left">Model</th>
              <th className="py-2 text-left">Stock</th>
              <th className="py-2 text-right">Unit Price</th>
              <th className="py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Product Image"
                  className="w-12 h-12"
                ></img>
              </td>

              <td className="py-4">Aliquam Quaerat</td>

              <td className="py-4">Product 16</td>

              <td className="py-4 text-green-600">In Stock</td>

              <td className="py-4 text-right">$108.80</td>

              <td className="py-4 text-right">
                <div className="inline-flex space-x-2">
                  <button className="bg-black text-white p-2 rounded hover:bg-gray-800">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>

                  <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="text-right">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

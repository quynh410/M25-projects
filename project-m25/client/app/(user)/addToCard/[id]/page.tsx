"use client";
import { Cart } from "@/app/interface/cart";
import {
  decreaseQuantity,
  deleteCart,
  getCartById,
  increaseQuantity,
  updateCartQuantity,
} from "@/app/services/admin/cart.service";
import { useRouter } from "next/navigation";
import { parse } from "path";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const account = JSON.parse(localStorage.getItem("account") || "[]");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  const cart = useSelector((state: any) => state.cartReducer.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (account.id) {
      dispatch(getCartById(account.id));
    }
  }, [dispatch, account.id]);
  // -------------------------
  const handleDeleteCart = (id?: number) => {
    // alert("Xác nhận xóa ?");
    if (id) {
      dispatch(deleteCart(id));
    }
  };
  // -------------------------

  // tính tổng total
  let totalPrice = cart.reduce((total: number, item: Cart) => {
    return total + item.products.unit_price * item.products.quantity;
  }, 0);
  // -----------------------
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity({ itemId, quantity: newQuantity }));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ) => {
    const newQuantity = parseInt(e.target.value, 10);
    handleQuantityChange(itemId, newQuantity);
  };
  // --------------------

  const [accounts, setAccounts] = useState(
    JSON.parse(localStorage.getItem("account") || "null")
  );
  console.log(111111111111111, account);

  const handleLogout = () => {
    localStorage.removeItem("account");
    setAccounts(null);
    router.push("/login"); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  };
  // ---------------------------
  const handleClick = (id: number) => {
    router.push(`/addToCard/${id}`);
  };
  return (
    <>
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-10 text-black">
        <a
          href="/"
          className="ml-8 font-bold text-xl cursor-pointer text-black no-underline"
        >
          MINIMOSA.
        </a>
        <div className="flex gap-16 mr-[40px] font-medium ">
          <a href="/" className="text-black no-underline hover:text-gray-300">
            Home
          </a>
          <a
            href="/wishList"
            className="text-black no-underline hover:text-gray-300"
          >
            Favorites
          </a>
          <a className="text-black no-underline hover:text-gray-300">Pages</a>
          <a className="text-black no-underline hover:text-gray-300">Shop</a>
          <a className="text-black no-underline hover:text-gray-300">More</a>
        </div>
        <div className="flex gap-4 mr-8">
          <i className="fa-solid fa-magnifying-glass"></i>

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
      {/* Breadcrumb */}
      <div className="py-4 text-sm text-gray-500 text-center bg-gray-200 mt-16">
        <i className="fa-solid fa-house"></i>
        <a href="#" className="hover:underline no-underline text-black ml-2">
          Shopping Card
        </a>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 ">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart (0.00kg)</h2>

        <table className="w-full mb-6">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Image</th>
              <th className="py-2 text-left">Product Name</th>
              <th className="py-2 text-left">Model</th>
              <th className="py-2 text-center">Quantity</th>
              <th className="py-2 text-right">Unit Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart && Array.isArray(cart) && cart.length > 0 ? (
              cart.map((item: Cart) => {
                return (
                  <>
                    <tr className="border-b" key={item.id}>
                      <td className="py-4">
                        <img
                          src={item.products.image}
                          alt="Product Image"
                          className="w-12 h-12"
                        ></img>
                      </td>
                      <td className="py-4">{item.products.product_name}</td>
                      <td className="py-4">{item.products.product_code}</td>
                      <td className="py-4 text-center">
                        <div className="flex items-center space-x-2 ">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.products.quantity - 1
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            type="text"
                            onChange={(e) => handleInputChange(e, item.id)}
                            name="quantity"
                            min="1"
                            value={item.products.quantity}
                            className="w-12 text-center p-2 border "
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.products.quantity + 1
                              )
                            }
                          >
                            +
                          </button>
                          <button
                            className="bg-red-500 p-2 hover:bg-red-600 h-[40px] text-white"
                            onClick={() => handleDeleteCart(item.id)}
                          >
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
                      <td className="py-4 text-right">
                        <b>
                          {item.products.unit_price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </b>
                      </td>
                      <td className="py-4 text-right">
                        {(
                          item.products.unit_price * item.products.quantity
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
          <p>
            Total : <b>${totalPrice}</b>
          </p>
        </table>

        <div className="mt-6 flex justify-between">
          <a href="/">
            <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
              Continue Shopping
            </button>
          </a>
          <a href="/checkOut">
            {cart.length == 0 ? (
              <></>
            ) : (
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Checkout
              </button>
            )}
          </a>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <footer className="bg-black text-white py-10 mt-[20px]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center border-b border-gray-700 pb-6 mb-6">
            <h2 className="text-xl font-semibold">
              Stay Connected With Our Email Updates
            </h2>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="text-black px-4 py-2 w-80 rounded-l-md focus:outline-none"
              ></input>
              <button className="bg-gray-800 text-white px-6 py-2 rounded-r-md">
                SUBSCRIBE
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold">ARTCRAFT.</h3>
              <p className="text-gray-400 mt-4">
                There are many variations of passages of look even slightly
                believable.
              </p>
              <div className="flex mt-4 space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">Information</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Delivery Information
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Site Map
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold">Extras</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Brands
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Gift Certificates
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Affiliate
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Specials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold">Store Information</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-400">
                  <i className="fas fa-map-marker-alt mr-2"></i>Artcraft - Art
                  Store, United States
                </li>
                <li className="text-gray-400">
                  <i className="fas fa-phone mr-2"></i>000-000-0000
                </li>
                <li className="text-gray-400">
                  <i className="fas fa-fax mr-2"></i>123456
                </li>
                <li className="text-gray-400">
                  <i className="fas fa-envelope mr-2"></i>
                  sales@yourcompany.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

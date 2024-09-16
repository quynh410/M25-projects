"use client";
import { Cart } from "@/app/interface/cart";
import {
  deleteCart,
  getAllCart,
  getCartById,
  updateCart,
} from "@/app/services/admin/cart.service";
import { addOrder, getAllOrder } from "@/app/services/admin/order.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  // -------------------------
  const userLocal = JSON.parse(localStorage.getItem("account") || "[]");

  const checkOut = useSelector((state: any) => state.cartReducer.cart);
  const checkOrder = useSelector((state: any) => state.orderReducer.orders);

  console.log(77777777777, checkOrder);

  useEffect(() => {
    dispatch(getAllCart());
    dispatch(getAllOrder());
  }, []);
  const cartUser = checkOut.filter(
    (cart: any) => cart.user_id === userLocal.id
  );
  const checkCart = checkOut.filter(
    (cart: any) => cart.user_id !== userLocal.id
  );
  // ----------------------

  let totalPrice = cartUser.reduce((total: number, item: Cart) => {
    return total + item.products.unit_price * item.products.quantity;
  }, 0);

  // ------------------------
  const router = useRouter();
  const [email, setEmail] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [phone, setPhone] = useState<any>("");
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleOders = () => {
    if (!email || !name || !address) {
      alert("Hãy điền đầy đủ thông tin");
      return;
    }

    const newOrder = {
      order_id: Math.ceil(Math.random() * 100),
      user_id: userLocal.id,
      total_price: totalPrice,
      order_details: [...cartUser],
      receive_name: name,
      receive_address: address,
      receive_phone: phone,
    };

    // Thêm đơn hàng
    dispatch(addOrder(newOrder))
      .then(() => {
        dispatch(getAllOrder());
        alert("Đặt hàng thành công");
        // Xóa từng mục trong giỏ hàng sau khi đặt hàng
        cartUser.forEach((item: any) => {
          dispatch(deleteCart(item.id));
        });
        router.push("/");
      })
      .catch((error: any) => {
        console.error(error);
        alert("Đặt hàng thất bại");
      });
  };
  // --------------------
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
      {/* Breadcrumb */}
      <div className="py-4 text-sm text-gray-500 text-center bg-gray-200 mt-16">
        <i className="fa-solid fa-house"></i>
        <a href="#" className="hover:underline no-underline text-black ml-2">
          Check Out
        </a>
      </div>
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  onChange={handleName}
                  className="w-full p-2 border rounded"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={handleEmail}
                  className="w-full p-2 border rounded"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="address" className="block font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  onChange={handleAddress}
                  className="w-full p-2 border rounded"
                  placeholder="1234 Main St"
                />
              </div>
              <div>
                <label htmlFor="address" className="block font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  onChange={handlePhone}
                  className="w-full p-2 border rounded"
                  placeholder="0987656767"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
              {cartUser.map((item: any) => {
                return (
                  <>
                    <div className="flex justify-between">
                      <span>{item.products.product_name}</span>
                      <span>
                        {item.products.unit_price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>
                  </>
                );
              })}
              <div className="flex justify-between font-semibold border-t pt-4">
                <span>Total</span>
                <span>
                  {totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
              onClick={() => handleOders()}
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>

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

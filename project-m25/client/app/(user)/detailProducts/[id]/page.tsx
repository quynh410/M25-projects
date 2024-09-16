"use client";
import { Cart } from "@/app/interface/cart";
import { Products } from "@/app/interface/products";
import {
  addToCart,
  getCartById,
  updateCart,
} from "@/app/services/admin/cart.service";
import { getProductById } from "@/app/services/admin/products.service";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const account = JSON.parse(localStorage.getItem("account") || "[]"); // lay tk tu local
  const products = useSelector((state: any) => state.productsReducer);
  console.log(111111, products);
  const router = useRouter();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById());
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  // ----------
  const pathName = usePathname();
  const productId = pathName.split("/").pop();
  const detail = useSelector(
    (state: any) => state.productsReducer.productDetail
  );

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(Number(productId)));
    }
  }, [dispatch, productId]);
  // --------------------------------------

  const cart = useSelector((state: any) => state.cartReducer.cart);
  useEffect(() => {
    if (account.id) {
      dispatch(getCartById(account.id));
    }
  }, [dispatch, account.id]);
  const handleAddToCart = async (product: Products) => {
    const existingProduct = cart.find(
      (item: Cart) => item.products.id === product.id
    );
    if (existingProduct) {
      const updateProduct = {
        ...existingProduct,
        products: {
          ...existingProduct.products,
          quantity: existingProduct.products.quantity + 1,
        },
      };      
      await dispatch(updateCart(updateProduct));
      alert('Đã có trong giỏ hàng')
    } else {
      const newCart = {
        user_id: account.id,
        products: {
          ...product,
          quantity: 1,
        },
      };
      await dispatch(addToCart(newCart));
      alert('Đã Thêm vào giỏ hàng')
    }
  };
  const handleClick = (id: number) => {
    router.push(`/addToCard/${id}`);
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
  return (
    <div>
      {/* Header */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-10 text-black h-[70px]">
        <a
          href="/"
          className="ml-8 font-bold text-xl cursor-pointer text-black no-underline"
        >
          MINIMOSA.
        </a>
        <div className="flex gap-16 mr-[40px] font-medium">
          <a href="/" className="text-black no-underline hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-black no-underline hover:text-gray-300">
            favorites
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

            <button onClick={() => handleClick(account.id)}>
              <i className="fa-solid fa-cart-shopping cursor-pointer text-black"></i>
            </button>
            
          </div>

        </div>
      </div>
      {/* Breadcrumb */}
      <div className="py-4 text-sm text-gray-500 text-center bg-gray-200 mt-16">
        <i className="fa-solid fa-house"></i>
        <a href="#" className="hover:underline no-underline text-black ml-2">
          Sculpture
        </a>
        <span className="mx-2">|</span>
        <a href="#" className="hover:underline no-underline text-black">
          Armchairs
        </a>
        <span className="mx-2">|</span>
        <a href="#" className="hover:underline no-underline text-black">
          Poufs
        </a>
        <span className="mx-2">|</span>
        Occasion Praesentium
      </div>

      <div className="bg-gray-100 p-10 min-h-screen">
        <div className="container mx-auto flex flex-col md:flex-row p-6">
          <div
            key={detail.id}
            className="container mx-auto flex flex-col md:flex-row p-6"
          >
            <div className="w-full md:w-1/2">
              <img
                src={detail.image}
                alt={detail.product_name}
                className="w-[600px] h-[700px] object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-10 mt-6 md:mt-0">
              <h1 className="text-3xl font-bold text-gray-800">
                {detail.product_name}
              </h1>
              <hr className="my-4" />
              <div className="flex items-center">
                <div className="text-yellow-500 text-xl">{detail.rating}</div>
                <span className="ml-2 text-gray-600">(2 reviews)</span>
                <a
                  href="#"
                  className="ml-4 text-gray-400 no-underline hover:text-gray-500"
                >
                  Write a review
                </a>
              </div>

              <p className="mt-4 text-gray-600">
                <b>Brand:</b> {detail.brand}
              </p>
              <p className="text-gray-600">
                <b>Product Code:</b> {detail.product_code}
              </p>
              <p className="mt-2 text-gray-500 italic">
                <b>Availability:</b> {detail.availability}
              </p>
              <hr className="my-4" />
              {/* Price */}
              <p className="mt-6 text-3xl font-semibold text-gray-800">
                ${detail.unit_price}
              </p>
              <label className="text-sm text-gray-600">
                Ex Tax: {detail.unit_price}
              </label>
              {/* Quantity and Add to Cart - moved down here */}
              <div className="flex items-center mt-6 space-x-4">
                
                {/* Buttons */}
                <button
                  className="bg-black text-white py-2 px-4 text-lg hover:bg-gray-800 transition-colors"
                  onClick={() => handleAddToCart(detail)}
                >
                  Add To Cart
                </button>
                <button className="w-12 h-12 bg-gray-200 text-lg hover:bg-gray-400 flex items-center justify-center"
                >
                  ♡
                </button>
                <button className="w-12 h-12 bg-gray-200 text-lg hover:bg-gray-400 flex items-center justify-center">
                  ⇆
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-black text-white py-10">
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
                      <i className="fas fa-map-marker-alt mr-2"></i>Artcraft -
                      Art Store, United States
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
    </div>
  );
}

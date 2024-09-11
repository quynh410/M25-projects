"use client";
import { Products } from "@/app/interface/products";
import { getProductById } from "@/app/services/admin/products.service";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const products = useSelector((state: any) => state.productsReducer.productsproductDetail);
  console.log(111111,products);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById());
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleForm = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <div>
      {/* Header */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-10 text-black h-[70px]">
        <h1 className="ml-8 font-bold text-xl">MINIMOSA.</h1>
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
          <i
            className="fa-regular fa-user cursor-pointer"
            onClick={toggleForm}
          ></i>

          {isOpen && (
            <div className="absolute mt-[30px] right-12 p-4  rounded-lg shadow-md">
              <a
                className="block text-black hover:text-gray-500 cursor-pointer mb-2 no-underline"
                href="#"
              >
                Đăng Nhập
              </a>
              <a
                className="block text-black hover:text-gray-500 cursor-pointer no-underline"
                href="#"
              >
                Đăng Ký
              </a>
            </div>
          )}

          <i className="fa-solid fa-cart-shopping cursor-pointer"></i>
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
          {products?.map((product: Products) => {
            return (
              <div
                key={product.id}
                className="container mx-auto flex flex-col md:flex-row p-6"
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={product.image}
                    alt={product.product_name}
                    className="w-[600px] h-[700px] object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-10 mt-6 md:mt-0">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {product.product_name}
                  </h1>
                  <hr className="my-4" />
                  <div className="flex items-center">
                    <div className="text-yellow-500 text-xl">
                      {product.rating}
                    </div>
                    <span className="ml-2 text-gray-600">(2 reviews)</span>
                    <a
                      href="#"
                      className="ml-4 text-gray-400 no-underline hover:text-gray-500"
                    >
                      Write a review
                    </a>
                  </div>

                  <p className="mt-4 text-gray-600">
                    <b>Brand:</b> {product.brand}
                  </p>
                  <p className="text-gray-600">
                    <b>Product Code:</b> {product.product_code}
                  </p>
                  <p className="mt-2 text-gray-500 italic">
                    <b>Availability:</b> {product.availability}
                  </p>
                  <hr className="my-4" />

                  {/* Price */}
                  <p className="mt-6 text-3xl font-semibold text-gray-800">
                    {product.unit_price}
                  </p>
                  <label className="text-sm text-gray-600">
                    Ex Tax: {product.unit_price}
                  </label>
                </div>
              </div>
            );
          })}

          {/* Quantity and Add to Cart */}
          <div className="flex items-center mt-6 space-x-4">
            <label htmlFor="quantity" className="text-gray-600">
              Qty
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              defaultValue="1"
              min="1"
              max="10"
              className="border border-gray-300 px-3 py-2 w-16 text-center rounded-md"
            />

            {/* Buttons */}
            <button className="bg-black text-white py-2 px-4 text-lg  hover:bg-gray-800 transition-colors">
              Add To Cart
            </button>
            <button className="w-12 h-12 bg-gray-200  text-lg hover:bg-gray-400 flex items-center justify-center">
              ♡
            </button>
            <button className="w-12 h-12 bg-gray-200  text-lg hover:bg-gray-400 flex items-center justify-center">
              ⇆
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

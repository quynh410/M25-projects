"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousels,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./services/admin/products.service";
import { Products } from "./interface/products";
import { useRouter } from "next/navigation";

export default function Home() {
  const products = useSelector((state: any) => state.productsReducer.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  // State cho pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  // Lấy các sản phẩm của trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  // Hàm thay đổi trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // Số trang
  const totalPages = Math.ceil(products.length / productsPerPage);
  // -------
  const [isOpen, setIsOpen] = useState(false);
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  // --------------------
  const route = useRouter();
  const handleDetail = (id: number) => {
    route.push(`/detailProducts/${id}`);
  };
  // ----------------------------------------------------------------
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("account") || "null")
  );
  console.log(111111111111111, account);

  const handleLogout = () => {
    localStorage.removeItem("account");
    setAccount(null);
    route.push("/login"); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  };
  return (
    <>
      <div className="relative ">
        <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-10 text-black">
          <h1 className="ml-8">MINIMOSA.</h1>
          <div className="flex gap-16 mr-[40px] font-medium ">
            <a>Home</a>
            <a>Sculpture</a>
            <a>Pages</a>
            <a>Shop</a>
            <a>More</a>
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
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
        <div>
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://capricathemes.com/opencart/OPC02/OPC020033/image/cache/catalog/main-banner-1-1903x975.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://capricathemes.com/opencart/OPC02/OPC020033/image/cache/catalog/main-banner-2-1903x975.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <br /> <br />
        <div className="flex gap-[80px] items-center justify-center">
          <div className="flex items-center gap-4">
            <i className="fa-solid fa-truck-fast text-[40px] text-gray-400"></i>
            <div>
              <span className="font-medium">Free shipping</span>
              <p className="text-gray-400">Lorem Ipsum is simply</p>
            </div>
          </div>
          <div className="h-[40px] w-[1px] bg-gray-300"></div>
          <div className="flex items-center gap-4">
            <i className="fa-solid fa-phone text-[40px] text-gray-400"></i>
            <div>
              <span className="font-medium">Online support</span>
              <p className="text-gray-400">Lorem Ipsum is simply</p>
            </div>
          </div>
          <div className="h-[40px] w-[1px] bg-gray-300"></div>
          <div className="flex items-center gap-4">
            <i className="fa-solid fa-rotate-left text-[40px] text-gray-400"></i>
            <div>
              <span className="font-medium">Money Back</span>
              <p className="text-gray-400">Lorem Ipsum is simply</p>
            </div>
          </div>
          <div className="h-[40px] w-[1px] bg-gray-300"></div>
          <div className="flex items-center gap-4">
            <i className="fa-solid fa-gear text-[40px] text-gray-400"></i>
            <div>
              <span className="font-medium">Our Services</span>
              <p className="text-gray-400">Lorem Ipsum is simply</p>
            </div>
          </div>
        </div>
        <br /> <br />
        <div className="flex justify-center">
          <div className="text-center">
            <h1 className="font-semibold text-[40px]">Top Categories</h1>
            <div className="w-[100px] h-[2px] bg-black mt-2 mx-auto transition-all duration-700 ease-in-out hover:w-[250px]"></div>
          </div>
        </div>
        <div className="flex justify-center p-10 ">
          <div className="flex gap-2 p-3 bg-gray-300 border border-gray-300 shadow-lg">
            <div className="relative flex flex-col items-center p-6 bg-white border border-gray-300 w-[350px]">
              <img
                src="https://capricathemes.com/opencart/OPC02/OPC020033/image/catalog/category-image1.jpg"
                alt="Ceramic Flower Vase"
                className="w-60 h-64 rounded-lg mt-[30px] transition-transform duration-700 ease-in-out transform hover:scale-125"
              />
              <h3 className="absolute top-0 left-0 right-0 p-2 text-lg font-semibold text-center text-black bg-opacity-50 rounded-t-lg">
                Ceramic Flower Vase
              </h3>
            </div>
            <div className="relative flex flex-col items-center p-6 bg-white border border-gray-300 w-[350px]">
              <img
                src="https://capricathemes.com/opencart/OPC02/OPC020033/image/catalog/category-image2.jpg"
                alt="Ceramic Modern Art"
                className="w-72 h-72 object-cover rounded-lg transition-transform duration-700 ease-in-out transform hover:scale-110"
              />
              <h3 className="mt-6 text-lg font-semibold text-center">
                Ceramic Modern Art
              </h3>
            </div>
            <div className="relative flex flex-col items-center p-6 bg-white border border-gray-300 w-[350px]">
              <img
                src="https://capricathemes.com/opencart/OPC02/OPC020033/image/catalog/category-image3.jpg"
                alt="Home Decor Art"
                className="w-60 h-70 rounded-lg transition-transform duration-700 ease-in-out transform hover:scale-125 mt-[15px]"
              />
              <h3 className="absolute top-0 left-0 right-0 p-2 text-lg font-semibold text-center text-black bg-opacity-50 rounded-t-lg">
                Home Decor Art
              </h3>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-semibold text-[40px]">Featured Products</h1>
          <div className="w-[100px] h-[2px] bg-black mt-2 mx-auto transition-all duration-700 ease-in-out hover:w-[250px]"></div>
        </div>{" "}
        <br /> <br />
        <div className="flex gap-[30px] ml-[750px]">
          <a href="" className="text-black no-underline hover:text-green-600">
            Sculpture
          </a>
          <a href="" className="text-black no-underline hover:text-green-600">
            Maquette
          </a>
          <a href="" className="text-black no-underline hover:text-green-600">
            Figurines
          </a>
          <a href="" className="text-black no-underline hover:text-green-600">
            Ceramic
          </a>
        </div>
        <div className="flex justify-center p-10">
          <div className="flex flex-wrap justify-center gap-4">
            {currentProducts.map((product: Products) => (
              <div key={product.id} className="bg-white p-4 w-[350px]">
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt=""
                    className="w-full  transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
                <div className="text-yellow-500 text-sm mt-2">
                  {product.rating}
                </div>
                <h2
                  onClick={() => handleDetail(product.id)}
                  className="text-lg font-semibold mt-1 text-black no-underline hover:text-gray-300"
                >
                  {product.product_name}
                </h2>
                <div className="text-xl font-bold mt-2">
                  {product.unit_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
                {product.unit_price && (
                  <div className="text-red-500 text-sm mt-1">
                    {product.discount}
                    <span className="line-through text-gray-600">
                      {product.unit_price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>{" "}
        <div className="flex justify-center items-center mt-8">
          <ul className="flex space-x-2">
            {/* Hiển thị nút Previous */}
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${
                  currentPage === 1 ? "bg-gray-200" : "bg-white"
                }`}
              >
                Previous
              </button>
            </li>

            {/* Hiển thị các số trang */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {/* Hiển thị nút Next */}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded ${
                  currentPage === totalPages ? "bg-gray-200" : "bg-white"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
        <br /> <br />
        <div className="relative h-[540px]">
          <img
            src="https://capricathemes.com/opencart/OPC02/OPC020033/image/catalog/cms-banner.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full  "
          />
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white p-4">
            <h1 className="text-[70px] font-medium ml-[50pc]">30% Save</h1>
            <p className="text-[50px] ml-[57pc]">Latest Ceramic Art</p>
            <p className=" max-w-lg ml-[53pc] text-gray-300">
              There are many variations of passages of Lorem.
            </p>
            <button className="mt-6 bg-white text-black py-2 px-4  hover:bg-orange-600 transition duration-300 ml-[40pc]">
              Shop Now
            </button>
          </div>
        </div>{" "}
        <br /> <br />
        <div className="text-center">
          <h1 className="font-semibold text-[40px]">Latest Blog</h1>
          <div className="w-[100px] h-[2px] bg-black mt-2 mx-auto transition-all duration-700 ease-in-out hover:w-[250px]"></div>
        </div>
        <br /> <br />
        <div>
          <Carousels
            opts={{
              align: "start",
            }}
            className="w-[900px] ml-[30pc]"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square  justify-center p-2">
                        <img
                          src="https://capricathemes.com/opencart/OPC02/OPC020033/image/cache/catalog/blog-6-893x752.jpg"
                          alt=""
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousels>{" "}
          <br /> <br />
        </div>
        <div>
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
      </div>
    </>
  );
}

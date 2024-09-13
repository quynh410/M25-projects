"use client";
import { Account, Accounts } from "@/app/interface/admin";
import { getAllUser } from "@/app/services/admin/users.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { Account } from "../../interface/user";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUser } from "../../services/admin/user.service";

function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
export default function Register() {
  const userState = useSelector((state: any) => state.userReducer.user);
  const dispatch = useDispatch();
  const [account, setAccount] = useState<Accounts>({
    email: "",
    password: "",
  });
  const [errorAccount, setErrorAccount] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    let valid = true;
    e.preventDefault();
    if (!account.email) {
      setErrorAccount((prevErr: any) => ({
        ...prevErr,
        email: "Vui lòng nhập email",
      }));
      valid = false;
    } else {
      setErrorAccount((prevErr: any) => ({
        ...prevErr,
        email: "",
      }));
    }
    if (!account.password) {
      setErrorAccount((prevErr: any) => ({
        ...prevErr,
        password: "Vui lòng nhập mật khẩu",
      }));
      valid = false;
    } else {
      setErrorAccount((prevErr: any) => ({
        ...prevErr,
        password: "",
      }));
    }

    if (valid && userState.length > 0) {
      const findUser = userState.find(
        (user: any) =>
          user.email === account.email && user.password === account.password
      );
      console.log(findUser);
      if (findUser) {
        if (findUser.status === 1) {
          alert("Tài khoản đã bị chặn!");
        } else {
          localStorage.setItem("account", JSON.stringify(findUser));
          alert("Đăng nhập thành công");
          router.push("/");
        }
      } else {
        setErrorAccount((prevErr: any) => ({
          ...prevErr,
          password: "Tài khoản hoặc mật khẩu không đúng",
        }));
        valid = false;
      }
    }
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  // const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setAccount({
  //     ...account,
  //     [name]: value,
  //   });
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-200 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://capricathemes.com/opencart/OPC02/OPC020033/image/cache/catalog/main-banner-1-1903x975.jpg')",
        }}
      ></div>
      <div className="absolute top-4 left-4 z-20">
        <Link href={`/`} className="py-2 px-4">
          <i className="fa-solid fa-arrow-left"></i> Trở về
        </Link>
      </div>
      <div className="relative z-10 bg-white bg-opacity-50 border-solid border-2 border-gray-700 w-[850px] flex gap-[20px] mt-[-30px] rounded font-sans p-8">
        <div className="w-1/2">
          <img
            src="https://i.pinimg.com/originals/9f/bd/9b/9fbd9ba0e1cbc81307f3f48b2bf51778.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[30px]"
          />
        </div>
        <div className="w-1/2">
          <h2 className="font-extrabold uppercase text-[30px] mb-6">
            Đăng nhập
          </h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-Mail</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              name="email"
              type="text"
              value={account.email}
              onChange={handleChange}
              placeholder="Enter your email"
            /> 
            {errorAccount.email && (
              <span className="text-red-500 text-[12px]">
                {errorAccount.email}
              </span>
            )} <br />
            <label htmlFor="password">Password</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              name="password"
              type="password"
              onChange={handleChange}
              value={account.password}
              placeholder="Enter your password"
            />
            {errorAccount.password && (
              <span className="text-red-500 text-[12px]">
                {errorAccount.password}
              </span>
            )}
            <button
              type="submit"
              className="bg-blue-600 border-none rounded text-white w-full h-[40px] mb-6"
            >
              Đăng nhập
            </button>
          </form>
          <div className="flex items-center justify-center my-8">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="mx-4 font-bold text-gray-400">Or</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>
          <Link href="/register">
            <button className="bg-white border-2 border-gray-800 w-full h-[40px] rounded text-center text-gray-500">
              Đăng kí
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

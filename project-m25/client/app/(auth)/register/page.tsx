"use client";
import { AccountRe } from "@/app/interface/admin";
import { addUser, getAllUser } from "@/app/services/admin/users.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { User } from "../../interface/user";
// import { addUser, getAllUser } from "../../services/admin/user.service";
// import { format } from "date-fns";

function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export default function Register() {
  const router = useRouter();
  const resetData = () => {
    setAccount({
      id: 0,
      name: "",
      email: "",
      password: "",
      address: "",
      card: [],
      // status: 0,
    });
  };
  const userState = useSelector((state: any) => state.userReducer.user);
  const dispatch = useDispatch();
  const [account, setAccount] = useState<AccountRe>({
    id: Math.ceil(Math.random() * 10000000),
    name: "",
    email: "",
    password: "",
    address: "",
    card: [],
  });
  const [errorAccount, setErrorAccount] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    card: [],
  });
  // Hàm đăng kí
  const handleSubmit = async (e: React.FormEvent) => {
    // Ngăn chặn load trang
    e.preventDefault();

    // Validate dữ liệu
    let valid = true;
    if (!account.name) {
      errorAccount.name = "Tên không được để trống";
      valid = false;
    } else {
      errorAccount.name = "";
    }

    if (!account.email) {
      errorAccount.email = "Email không được để trống";
      valid = false;
    } else if (!validateEmail(account.email)) {
      errorAccount.email = "Email không đúng định dạng";
      valid = false;
    } else if (userState.some((item: any) => item.email === account.email)) {
      errorAccount.email = "Email đã tồn tại";
      valid = false;
    } else {
      errorAccount.email = "";
    }

    if (!account.password) {
      errorAccount.password = "Mật khẩu không được để trống";
      valid = false;
    } else {
      errorAccount.password = "";
    }
    if (!account.address) {
      errorAccount.address = "Địa chỉ không được để trống";
      valid = false;
    }else{
      errorAccount.address = "";
    }

    setErrorAccount({ ...errorAccount });

    if (valid) {
      const newUser = {
        name: account.name,
        email: account.email,
        password: account.password,
        address: account.address,
      };
      await dispatch(addUser(newUser));
      await dispatch(getAllUser());
      resetData();
      router.push("/login")
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount({
        ...account,
        [name]: value
    })
}

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-200 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://capricathemes.com/opencart/OPC02/OPC020033/image/cache/catalog/main-banner-1-1903x975.jpg ')",
        }}
      ></div>
      <div className="absolute top-4 left-4 z-20">
        <Link href="/" className="py-2 px-4">
          <i className="fa-solid fa-arrow-left"></i> Trở về
        </Link>
      </div>
      <div className="relative z-10 bg-white bg-opacity-50 border-solid border-2 border-gray-700 w-[850px] flex gap-[20px] mt-[-30px] rounded font-san p-8">
        <div className="w-1/2">
          <img
            src="https://i.pinimg.com/originals/ce/3b/12/ce3b12bd23c5f36a0c47ca327d195466.jpg"
            alt=""
            className="w-full h-full object-cover rounded-[30px]"
          />
        </div>
        <div className="w-1/2">
          <h2 className="font-extrabold uppercase text-[30px] mb-6">Đăng Kí</h2>
          <form onSubmit={handleSubmit} >
            <label htmlFor="username">Tên đăng nhập</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              type="text"
              placeholder="Enter your username"
              name="name"
              value={account.name}
              onChange={handleChange}
            />
            <div className="h-[24px]">
              {errorAccount.name && (
                <p className="text-red-500 text-sm">{errorAccount.name}</p>
              )}
            </div>
            <label htmlFor="email">E-Mail</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              type="text"
              placeholder="Enter your email"
              name="email"
                value={account.email}
              onChange={handleChange}
            />
            <div className="h-[24px]">
              {errorAccount.email && (
                <p className="text-red-500 text-sm">{errorAccount.email}</p>
              )}
            </div>
            <label htmlFor="password">Password</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              type="password"
              placeholder="Enter your password"
              name="password"
                value={account.password}
              onChange={handleChange}
            />
            <div className="h-[24px]">
              {errorAccount.password && (
                <p className="text-red-500 text-sm">{errorAccount.password}</p>
              )}
            </div>
            <label htmlFor="password">Address</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              type="text"
              placeholder="Enter your Address"
              name="address"
                value={account.address}
              onChange={handleChange}
            />
            <div className="h-[24px]">
              {errorAccount.address && (
                <p className="text-red-500 text-sm">{errorAccount.address}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 border-none rounded text-white w-full h-[40px] mb-6"
            >
              Đăng Kí
            </button>
          </form>
          <div className="flex items-center justify-center my-8">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="mx-4 font-bold text-gray-400">Or</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>
          <Link href="/login">
            <button className="bg-white border-2 border-gray-800 w-full h-[40px] rounded text-center text-gray-500">
              Đăng Nhập
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState([]);
  const [account, setAccount] = useState({
    id: Math.ceil(Math.random() * 10000),
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const accounts = {
    email: "admin123@gmail.com",
    password: "admin123",
  };
  const handleValidation = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  useEffect(() => {
    const getData = async () => {
      let res = await axios.get("http://localhost:8080/admin");
      setAdmin(res.data);
    };
    getData();
  }, []);
  const handleSubmit = () => {
    if (
      account.email === account.email &&
      account.password === account.password
    ) {
      localStorage.setItem("admin", JSON.stringify(accounts));
      router.push("/adminHome");
    } else {
      alert("Thông tin đăng nhập không chính xác");
      setEmail("");
      setPassword("");
      localStorage.removeItem("admin");
    }
  };
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
            Đăng nhập admin
          </h2>
          <form>
            <label htmlFor="email">E-Mail</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              name="email"
              type="text"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              name="password"
              type="password"
              placeholder="Enter your passwords"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleSubmit}
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
        </div>
      </div>
    </div>
  );
}

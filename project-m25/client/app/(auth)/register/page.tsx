"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
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
//   const userState = useSelector((state: any) => state.userReducer.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getAllUser());
//   }, []);
//   console.log(userState);
//   const [user, setUsers] = useState<User>({
//     id: Math.ceil(Math.random() * 100000),
//     name: "",
//     email: "",
//     password: "",
//     address:"",
//     card:[]
//   });

//   // Lỗi
//   const [error, setError] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address:"",
//     card:[]

//   });

//   // const [username, setUsername] = useState<string>('');
//   // const [email, setEmail] = useState<string>('');
//   // const [password, setPassword] = useState<string>('');
//   // const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

//   // const validate = () => {
//   //   const newErrors: { username?: string; email?: string; password?: string } = {};
//   //   if (!username) {
//   //     newErrors.username = "Username is required";
//   //   }
//   //   if (!email) {
//   //     newErrors.email = "Email is required";
//   //   } else if (!/\S+@\S+\.\S+/.test(email)) {
//   //     newErrors.email = "Email address is invalid";
//   //   }
//   //   if (!password) {
//   //     newErrors.password = "Password is required";
//   //   } else if (password.length < 6) {
//   //     newErrors.password = "Password must be at least 6 characters";
//   //   }
//   //   setErrors(newErrors);
//   //   return Object.keys(newErrors).length === 0;
//   // };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     let valid = true;

//     if (!user.name) {
//       error.name = "Tên không được để trống";
//       valid = false;
//     } else {
//       error.name = "";
//     }

//     if (!user.email) {
//       error.email = "Email không được để trống";
//       valid = false;
//     } else if (!validateEmail(user.email)) {
//       error.email = "Email không đúng định dạng";
//       valid = false;
//     } else if (
//       userState.some((existEmail: any) => existEmail.email === user.email)
//     ) {
//       error.email = "Email đã tồn tại";
//       valid = false;
//     } else {
//       error.email = "";
//     }

//     if (!user.password) {
//       error.password = "Mật khẩu không được để trống";
//       valid = false;
//     } else {
//       error.password = "";
//     }
//     if(!user.address){
//       error.address = "Địa chỉ không được để trống";
//       valid = false;
//     }else{
//       error.address = "";
//     }
//     setError({ ...error });

//     if (valid) {
//       const newUser = {
//         name: user.name,
//         email: user.email,
//         address: user.address,
//         created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
//         status: 0,
//         password: user.password,
//         card: [],
//       };
//       dispatch(addUser(newUser));
//       dispatch(getAllUser());
//       navigate("/login");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUsers({ ...user, [name]: value });
//   };
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
          <form >
            <label htmlFor="username">Tên đăng nhập</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              type="text"
              placeholder="Enter your username"
              name="name"
             
            />
          
            <label htmlFor="email">E-Mail</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              type="text"
              placeholder="Enter your email"
              name="email"
            //   value={user.email}
            //   onChange={handleChange}
            />
            {/* <div className="h-[24px]">
              {error.email && (
                <p className="text-red-500 text-sm">{error.email}</p>
              )}
            </div> */}
            <label htmlFor="password">Password</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              type="password"
              placeholder="Enter your password"
              name="password"
            //   value={user.password}
            //   onChange={handleChange}
            />
            {/* <div className="h-[24px]">
              {error.password && (
                <p className="text-red-500 text-sm">{error.password}</p>
              )}
            </div> */}
            <label htmlFor="password">Address</label> <br />
            <input
              className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
              type="text"
              placeholder="Enter your Address"
              name="address"
            //   value={user.address}
            //   onChange={handleChange}
            />
            {/* <div className="h-[24px]">
              {error.password && (
                <p className="text-red-500 text-sm">{error.address}</p>
              )}
            </div> */}
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

import Link from "next/link";

function validateEmail(email: any) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  export default function LoginAdmin() {
  //   const userState = useSelector((state: any) => state.userReducer.user);
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  
  //   useEffect(() => {
  //     dispatch(getAllUser());
  //   }, []);
  //   const [account, setAccount] = useState<Account>({
  //     id: Math.ceil(Math.random() * 10000),
  //     email: "",
  //     password: "",
  //   });
  
  //   const [error, setError] = useState({
  //     email: "",
  //     password: "",
  //   });
  
  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     let valid = true;
  //     if (!account.email) {
  //       error.email = "email không được để trống";
  //       valid = false;
  //     } else if (!validateEmail(account.email)) {
  //       error.email = "Email không đúng";
  //       valid = false;
  //     } else {
  //       error.email = "";
  //     }
  
  //     if (!account.password) {
  //       error.password = " Mật khẩu không để trống";
  //       valid = false;
  //     } else {
  //       error.password = "";
  //     }
  
  //     if (valid && userState.length > 0) {
  //       const findUser = userState.find(
  //         (item: any) =>
  //           item.email === account.email &&
  //           item.password === account.password &&
  //           item.status == 0
  //       );
  //       if (findUser) {
  //         localStorage.setItem("account", JSON.stringify(findUser));
  //         navigate("/");
  //       } else {
  //         error.password = "Email hoặc mật khẩu không đúng, hoặc đã bị khóa";
  //         valid = false;
  //       }
  //     }
  //     setError({ ...error });
  //   };
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setAccount({
  //       ...account,
  //       [name]: value,
  //     });
  //   };
  
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
              Đăng nhập admin
            </h2>
            <form >
              <label htmlFor="email">E-Mail</label> <br />
              <input
                className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
                name="email"
                type="text"
                placeholder="Enter your email"
              
              />
  
              <label htmlFor="password">Password</label> <br />
              <input
                className="border-2 border-zinc-600 rounded-[5px] w-full h-[40px] mb-1"
                name="password"
                type="password"
                placeholder="Enter your passwords"
             
              />
            
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
  
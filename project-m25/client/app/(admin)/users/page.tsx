"use client";
import React, { useEffect, useState } from "react";
import Header from "../header/page";
import Sidebar from "../sidebar/page";
import {
  addUser,
  getAllUser,
  searchName,
  sortUser,
  statusUser,
} from "@/app/services/admin/users.service";
import { useDispatch, useSelector } from "react-redux";
import { Account, Admin } from "@/app/interface/admin";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
function Example({
  show,
  handleClose,
  input,
  handleChange,
  err,
  handleAddUsers,
}: any) {
  return (
    <>
      <Modal
        backdrop="static"
        show={show}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="space-y-4">
              <div className="flex items-center">
                <label htmlFor="" className="w-32">
                  Tên:
                </label>
                <Form.Control
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  className="border border-black rounded px-2 py-1 ml-2 w-full"
                />
              </div>
              {err.name && (
                <p className="text-red-500 text-xs ml-[102px]">{err.name}</p>
              )}

              <div className="flex items-center">
                <label htmlFor="" className="w-32">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  className="border border-black rounded px-2 py-1 ml-2 w-full "
                />
              </div>
              {err.email && (
                <p className="text-red-500 text-xs ml-[102px]">{err.email}</p>
              )}
              <div className="flex items-center">
                <label htmlFor="" className="w-32">
                  Địa chỉ:
                </label>
                <input
                  type="text"
                  name="address"
                  value={input.address}
                  onChange={handleChange}
                  className="border border-black rounded px-2 py-1 ml-2 w-full"
                />
              </div>
              {err.address && (
                <p className="text-red-500 text-xs ml-[102px]">{err.address}</p>
              )}

              <div className="flex items-center">
                <label htmlFor="" className="w-32">
                  Thời gian tạo:
                </label>
                <input
                  type="date"
                  name="created_at"
                  value={input.created_at}
                  onChange={handleChange}
                  className="border border-black rounded px-1 py-1 "
                />
              </div>
              {err.created_at && (
                <p className="text-red-500 text-xs ml-[102px]">
                  {err.created_at}
                </p>
              )}
            </div>{" "}
            <br />
            <div className="flex items-center">
              <label htmlFor="" className="w-32">
                Số điện thoại:
              </label>
              <input
                type="text"
                name="phone"
                value={input.phone}
                onChange={handleChange}
                className="border border-black rounded px-1 py-1  "
              />
            </div>
            {err.phone && (
              <p className="text-red-500 text-xs ml-[102px]">{err.phone}</p>
            )}
            <br />
            <div className="flex items-center">
              <label htmlFor="" className="w-32">
                Tên đầy đủ:
              </label>
              <input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={handleChange}
                className="border border-black rounded px-1 py-1  "
              />
            </div>
            {err.fullname && (
              <p className="text-red-500 text-xs ml-[102px]">{err.fullname}</p>
            )}
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddUsers}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function Users() {
  const [user, setUser] = useState<Admin | null>(null);
  const [modalShow, setModalShow] = React.useState(false);
  const userState = useSelector((state: any) => state.userReducer.user);
  // --------------------

  const [search, setSearch] = useState("");
  const handleSearchName = () => {
    dispatch(searchName(search));
  };
  const users = useSelector((state: any) => state.userReducer.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const handleShow = (id: number) => {
    const findUser = userState.find((user: Admin) => user.id === id);

    if (findUser) {
      setUser(findUser);
      setModalShow(true);
    }
  };
  function MyVerticallyCenteredModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thông tin User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-between h-[200px]">
            <div>
              <b>Name: {user?.username}</b> <br /> <br />
              <b>Email: {user?.email}</b>
              <br /> <br />
              <b>Address: {user?.address}</b> <br /> <br />
              <b>Create At: {user?.created_at}</b>
            </div>
            <div className="ml-[10pc]">
              <img
                src="https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-50-hinh-anh-dai-dien-facebook-mac-dinh-dep-doc-la_2.jpg"
                alt=""
                className="h-[200px]"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [input, setInput] = useState<Account>({
    name: "",
    email: "",
    address: "",
    created_at: "",
    phone: "",
    fullname: "",
    status: true,
  });
  const [err, setErr] = useState({
    name: "",
    email: "",
    address: "",
    created_at: "",
    phone: "",
    fullname: "",
    status: true,
  });
  const resetInput = () => {
    setInput({
      name: "",
      email: "",
      address: "",
      created_at: "",
    });
  };
  const handleAddUsers = async () => {
    let validate = true;
    console.log(111111);

    if (!input.name) {
      err.name = "Tên không được để trống";
      validate = false;
    } else {
      err.name = "Tên không được bỏ trống";
    }
    if (!input.email) {
      err.email = "Email không được để trống";
      validate = false;
    } else if (!validateEmail(input.email)) {
      err.email = "Email không đúng định dạng";
      validate = false;
    } else {
      err.email = "";
    }
    if (!input.address) {
      err.address = "Địa chỉ không được để trống";
      validate = false;
    } else {
      err.address = "";
    }
    if (!input.created_at) {
      err.created_at = "Ngày tạo không được để trống";
      validate = false;
    } else {
      err.created_at = "";
    }
    if (!input.phone) {
      err.phone = "Số điện thoại không được để trống";
      validate = false;
    } else {
      err.phone = "";
    }
    if (!input.fullname) {
      err.fullname = "Tên đầy đủ không được để trống";
      validate = false;
    } else {
      err.fullname = "";
    }

    setErr({ ...err });
    if (validate) {
      const newUsers = {
        username: input.name,
        email: input.email,
        address: input.address,
        created_at: input.created_at,
        avatar:
          "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=VVXDQ2ftWTsQ7kNvgEsTadt&_nc_ht=scontent.fhan18-1.fna&_nc_gid=AXp3jmeNWjNNYIBHePTAf1C&oh=00_AYDz8-sNB58RG9XND9CXST7E2TwhmKQT842F2Wnbd1CajQ&oe=6701DFBA",
        phone: input.phone,
        fullname: input.fullname,
        status: true,
      };
      try {
        await dispatch(addUser(newUsers));
        dispatch(getAllUser());
        setShow(false);
        resetInput();
      } catch (err) {
        console.log("ERR", err);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  // --------
  const [sortByname, setSortByName] = useState("");
  const handleSortByName = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    dispatch(sortUser(order));
  };
  // -------
  const [selectedId, setselectedId] = useState<number | null>(null);
  // hàm khóa user
  const handleBlock = (id: number) => {
    setselectedId(id);
    dispatch(statusUser({ id, status: 1 }));
    dispatch(getAllUser());
    setselectedId(null);
  };
  // hàm mở khóa user
  const handleUnBlock = (id: number) => {
    setselectedId(id);
    dispatch(statusUser({ id, status: 0 }));
    dispatch(getAllUser());
    setselectedId(null);
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Header title="Quản lý người dùng" />
        <div className="p-8">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl">Danh sách người dùng</h2>
            <div className="relative ml-auto flex gap-[20px]">
              <select
                className="w-[100px] rounded border border-black"
                value={sortByname}
                onChange={handleSortByName}
              >
                <option value="">Sắp xếp</option>
                <option value="asc">Từ A đến Z</option>
                <option value="desc">Từ Z đến A</option>
              </select>
              <Button
                onClick={handleOpen}
                className="bg-white text-black border border-black w-[100px] h-[35px] rounded "
              >
                Thêm
              </Button>
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                className="border border-black rounded h-[35px] pl-4 pr-10"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <i
                className="fa-solid fa-magnifying-glass absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={handleSearchName}
              ></i>
            </div>
          </div>

          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">ID</th>
                <th className="py-2 px-4 border-b text-center">
                  Hình đại diện
                </th>
                <th className="py-2 px-4 border-b text-center">
                  Tên đăng nhập
                </th>
                <th className="py-2 px-4 border-b text-center">Email</th>
                <th className="py-2 px-4 border-b text-center">Địa chỉ</th>
                <th className="py-2 px-4 border-b text-center">
                  Thời gian tạo
                </th>
                <th className="py-2 px-4 border-b text-center">Trạng thái</th>
                <th className="py-2 px-4 border-b text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: Admin) => (
                <tr
                  key={user.id}
                  className={user.isBlocked ? "opacity-50" : ""}
                >
                  <td className="py-2 px-4 border-b text-center">{user.id}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <img
                      src={user.avatar}
                      className="h-16 w-16 object-cover mx-auto rounded-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {user.username}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {user.address}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {user.created_at}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {user.status}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <Button
                      className=" text-black py-1 px-2 rounded mr-2  border border-white bg-blue-200"
                      onClick={() => handleShow(user.id)}
                    >
                      "Xem"
                    </Button>
                    <span>
                      {user.status === 1 ? (
                        <button
                          className=" text-black h-9 px-2 rounded bg-yellow-300"
                          onClick={() => handleUnBlock(user.id)}
                        >
                          "Mở Khóa"
                        </button>
                      ) : (
                        <button
                          className=" text-black h-9 px-2 rounded bg-red-400"
                          onClick={() => handleBlock(user.id)}
                        >
                          "Khóa"
                        </button>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <Example
                show={show}
                handleClose={handleClose}
                input={input}
                handleChange={handleChange}
                err={err}
                handleAddUsers={handleAddUsers}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

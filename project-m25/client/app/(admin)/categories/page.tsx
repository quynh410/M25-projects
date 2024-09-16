"use client";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/page";
import Sidebar from "../sidebar/page";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  getAllCate,
  deleteCate,
  addCate,
  upadateCate,
} from "@/app/services/admin/categories.service";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Categories } from "@/app/interface/categories";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Categorie() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const categorie = useSelector(
    (state: any) => state.categoriesReducer.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCate());
  }, [dispatch]);

  const handleDelete = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedCategoryId !== null) {
      dispatch(deleteCate(selectedCategoryId));
      setShowModal(false);
      setSelectedCategoryId(null);
    }
  };
  const [input, setInput] = useState<Categories>({
    id: 0,
    category_id: 0,
    category_name: "",
    description: "",
    created_at: "",
  });
  const resetInput = () => {
    setInput({
      id: 0,
      category_id: 0,
      category_name: "",
      description: "",
      created_at: "",
    });
  };
  const [err, setErr] = useState({
    id: 1,
    category_id: 1,
    category_name: "",
    description: "",
    status: "",
    created_at: "",
  });
  const handleAddCate = async () => {
    let validate = true;
    if (!input.category_name) {
      err.category_name = "Tên không được để trống";
      validate = false;
    } else {
      err.category_name = "";
    }
    if (!input.description) {
      err.description = "Tên đầy đủ không được để trống";
      validate = false;
    } else {
      err.description = "";
    }
    if (!input.created_at) {
      err.created_at = "Vui lòng nhập ngày tạo";
      validate = false;
    } else {
      err.created_at = "";
    }
    setErr({ ...err });
    if (validate) {
      const newCategories = {
        category_name: input.category_name,
        description: input.description,
        created_at: input.created_at,
      };
      try {
        await dispatch(addCate(newCategories));
        dispatch(getAllCate());
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
  const handleUpdateCate = async () => {
    const newCategories = {
      id: input.id,
      category_id: input.category_id,
      category_name: input.category_name,
      description: input.description,
      created_at: input.created_at,
    };
    try {
      await dispatch(addCate(newCategories));
      dispatch(getAllCate());
      setShowModal(false);
      setSelectedCategoryId(null);
      resetInput();
    } catch (err) {
      console.log("ERR", err);
    }
  };
  // ----------------------------
  const [show, setShow] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setSelect(null);
    setInput({
      id: 0,
      category_id: 0,
      category_name: "",
      description: "",
      created_at: "",
    });
    setEditModal(false); // This is for adding new category
    setShow(true);
  };
  const [select, setSelect] = useState<any>(null);
  const handleUpdateCategory = (category: any) => {
    setSelect(category);
    setInput({
      id: category.id,
      category_id: category.category_id,
      category_name: category.category_name,
      description: category.description,
      created_at: category.created_at,
    });
    setEditModal(true); // This is for editing existing category
    setShow(true);
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleAddOrEditCategory = async () => {
    let valid = true;
    let newErr = { ...err };

    // Validate inputs
    if (!input.category_name) {
      newErr.category_name = "Tên danh mục không được để trống";
      valid = false;
    } else {
      newErr.category_name = "";
    }

    if (!input.description) {
      newErr.description = "Nhận xét không được để trống";
      valid = false;
    } else {
      newErr.description = "";
    }

    if (!input.created_at) {
      newErr.created_at = "Ngày tạo không được để trống";
      valid = false;
    } else {
      newErr.created_at = "";
    }

    setErr(newErr);

    if (valid) {
      const categoryData = {
        category_name: input.category_name,
        description: input.description,
        created_at: input.created_at,
      };

      try {
        if (editModal && select) {
          // If editing, dispatch update action
          await dispatch(upadateCate({ id: select.id, ...categoryData }));
        } else {
          // If adding, dispatch add action
          await dispatch(addCate(categoryData));
        }

        // Fetch updated list of categories
        dispatch(getAllCate());

        // Close the modal and reset the form
        setShow(false);
        setInput({
          id: 0,
          category_id: 0,
          category_name: "",
          description: "",
          created_at: "",
        });
      } catch (err) {
        console.error("Lỗi khi xử lý danh mục", err);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Header title="Quản lý danh mục sản phẩm" />
        <div className="p-8">
          <div className="relative ml-auto flex gap-[20px]">
            <h2 className="text-2xl mb-4">Danh mục sản phẩm</h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white text-black border border-black w-[100px] h-[35px] rounded ml-[71.5pc]"
                >
                  Thêm
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="">
                  <SheetTitle>Thêm Danh Mục</SheetTitle>
                  <SheetDescription>
                    Thêm danh mục tại đây , sau khi xog ấn vào Thêm
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Tên :
                    </Label>
                    <Input
                      name="category_name"
                      onChange={handleChange}
                      className="col-span-3"
                      value={input.category_name}
                    />
                    {err.category_name && (
                      <p className="text-red-500 text-xs ml-[102px]">
                        {err.category_name}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Mô tả :
                    </Label>
                    <Input
                      name="description"
                      value={input.description}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                    {err.description && (
                      <p className="text-red-500 text-xs ml-[102px]">
                        {err.description}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Ngày Tạo
                    </Label>
                    <input
                      type="date"
                      name="created_at"
                      value={input.created_at}
                      onChange={handleChange}
                      className="col-span-3 border border-black rounded h-[35px]"
                    />

                    {err.created_at && (
                      <p className="text-red-500 text-xs ml-[102px]">
                        {err.created_at}
                      </p>
                    )}
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit" onClick={handleAddCate}>
                      Thêm
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">ID Danh mục</th>
                <th className="py-2 px-4 border-b text-center">Tên danh mục</th>
                <th className="py-2 px-4 border-b text-center">
                  Mô tả danh mục
                </th>
                <th className="py-2 px-4 border-b text-center">Ngày Tạo</th>
                <th className="py-2 px-4 border-b text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categorie.map((category: Categories) => (
                <tr key={category.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {category.id}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {category.category_name}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {category.description}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {category.created_at}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {/* <button
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                      onClick={() => handleUpdateCate()}
                    >
                      Sửa
                    </button> */}
                    <Button
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                      onClick={() => handleUpdateCategory(category)}
                    >
                      Sửa
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          {editModal ? "Sửa Danh mục" : "Thêm Danh mục"}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <label className="block font-medium text-gray-700">
                          Tên:
                        </label>
                        <input
                          type="text"
                          name="category_name"
                          className="border border-black rounded p-2 mb-4 w-full"
                          value={input.category_name}
                          onChange={handleInputChange}
                        />
                        {err.category_name && (
                          <p className="text-red-500">{err.category_name}</p>
                        )}

                        <label className="block font-medium text-gray-700">
                          Mô tả:
                        </label>
                        <input
                          type="text"
                          name="description"
                          className="border border-black rounded p-2 mb-4 w-full"
                          value={input.description}
                          onChange={handleInputChange}
                        />
                        {err.description && (
                          <p className="text-red-500">{err.description}</p>
                        )}

                        <label className="block font-medium text-gray-700">
                          Ngày tạo:
                        </label>
                        <input
                          type="date"
                          name="created_at"
                          className="border border-black rounded p-2 w-full"
                          value={input.created_at}
                          onChange={handleInputChange}
                        />
                        {err.created_at && (
                          <p className="text-red-500">{err.created_at}</p>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleAddOrEditCategory}
                        >
                          {editModal ? "Save Changes" : "Add Category"}
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={() => handleDelete(category.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

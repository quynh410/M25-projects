"use client";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/page";
import Sidebar from "../sidebar/page";
import { useEffect, useState } from "react";
import {
  getAllCate,
  deleteCate,
} from "@/app/services/admin/categories.service";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Categories } from "@/app/interface/categories";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function Categories() {
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
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent className="w-[400px] sm:w-[540px]">
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Header title="Quản lý danh mục sản phẩm" />
        <div className="p-8">
          <div className="relative ml-auto flex gap-[20px]">
            <h2 className="text-2xl mb-4">Danh mục sản phẩm</h2>
            <button className="bg-white text-black border border-black w-[100px] h-[35px] rounded ml-[71.5pc]">
              Thêm
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">ID Danh mục</th>
                <th className="py-2 px-4 border-b text-center">Tên danh mục</th>
                <th className="py-2 px-4 border-b text-center">
                  Mô tả danh mục
                </th>
                <th className="py-2 px-4 border-b text-center">Trạng thái</th>
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
                    {category.status}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded mr-2">
                      Sửa
                    </button>
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

"use client";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/page";
import Sidebar from "../sidebar/page";
import {
  addProducts,
  deleteProducts,
  getAllProducts,
  searchProducts,
  sortProducts,
  updateProducts,
} from "@/app/services/admin/products.service";
import { useEffect, useState } from "react";
import { Products } from "@/app/interface/products";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storage } from "@/config/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Products() {
  const products = useSelector((state: any) => state.productsReducer.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [search, setSearch] = useState("");
  const handleSearchProducts = () => {
    dispatch(searchProducts(search));
  };
  // ----------------------------------------------------------------

  const [sortByname, setSortByName] = useState("");
  const handleSortByName = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    dispatch(sortProducts(order));
  };
  // ----------------------------------------------------------------
  const handleDelete = (id: number) => {
    console.log(1111111111111, id);

    alert("Muốn xóa ?");
    dispatch(deleteProducts(id));
  };
  // ----------------------------------------------------------------

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [editMode, setEditMode] = useState(false);
  const handleShow = () => {
    setEditMode(false); // Đặt lại chế độ thêm mới
    setSelectedProduct(null); // Đặt lại sản phẩm đã chọn
    setInputValue({
      product_name: "",
      image: "",
      unit_price: "",
      stock_quantity: "",
    });
    setImage("https://vnsteelthanglong.vn/core/img/default_image.png");
    setShow(true);
  };
  const changeImage = async (e: any) => {
    let selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const imageRef = ref(storage, `upload-image/${selectedImage.name}`);
      uploadBytes(imageRef, selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);

          setImage(url);
        });
      });
      const previewUrl = URL.createObjectURL(selectedImage);
      setImage(previewUrl); // Hiển thị ảnh xem trước từ URL tạm thời
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setInputValue({
      product_name: product.product_name,
      image: product.image,
      unit_price: product.unit_price,
      stock_quantity: product.stock_quantity,
    });
    setEditMode(true);
    setImage(product.image);
    setShow(true);
  };
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [inputValue, setInputValue] = useState({
    product_name: "",
    image: "",
    unit_price: "",
    stock_quantity: "",
  });

  const [error, setError] = useState({
    product_name: "",
    image: "",
    unit_price: "",
    stock_quantity: "",
  });

  const reset = () => {
    setInputValue({
      product_name: "",
      image: "",
      unit_price: "",
      stock_quantity: "",
    });
    setImage("https://vnsteelthanglong.vn/core/img/default_image.png");
  };
  const handleAddOrUpdateProduct = async () => {
    let valid = true;
    let newError = { ...error }; // Tạo bản sao của đối tượng error

    if (!inputValue.product_name) {
      newError.product_name = "Tên sản phẩm không được để trống";
      valid = false;
    } else {
      newError.product_name = "";
    }
    if (!inputValue.unit_price) {
      newError.unit_price = "Vui lòng nhập giá";
      valid = false;
    } else {
      newError.unit_price = "";
    }

    if (!inputValue.stock_quantity) {
      newError.stock_quantity = "Vui lòng nhập số lượng";
      valid = false;
    } else {
      newError.stock_quantity = "";
    }

    // Cập nhật state error mới
    setError(newError);

    if (valid) {
      const newProduct = {
        product_name: inputValue.product_name,
        image: image,
        unit_price: Number(inputValue.unit_price),
        stock_quantity: Number(inputValue.stock_quantity),
      };

      try {
        if (editMode && selectedProduct) {
          await dispatch(
            updateProducts({ id: selectedProduct.id, ...newProduct })
          );
        } else {
          await dispatch(addProducts(newProduct));
        }
        dispatch(getAllProducts());
        setShow(false); // Đóng modal khi thành công
        reset(); // Reset form khi thành công
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };
  const [image, setImage] = useState(
    "https://vnsteelthanglong.vn/core/img/default_image.png"
  );
  const handleChangeImage = async (e: any) => {
    let selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const imageRef = ref(storage, `upload-image/${selectedImage.name}`);
      uploadBytes(imageRef, selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);

          setImage(url);
        });
      });
      const previewUrl = URL.createObjectURL(selectedImage);
      setImage(previewUrl);
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Header title="Danh sách sản phẩm" />
        <div className="flex items-center mb-4">
          <h2 className="text-2xl">Danh sách sản phẩm</h2>
          <div className="relative ml-auto flex gap-[20px]">
            <select
              name=""
              id=""
              className=" w-[100px] rounded border border-black "
              value={sortByname}
              onChange={handleSortByName}
            >
              <option value="">Sắp xếp</option>
              <option value="asc">Từ A đến Z</option>
              <option value="desc">Từ Z đến A</option>
            </select>
            <button
              className="bg-white text-black border border-black w-[100px] h-[35px] rounded"
              onClick={handleShow}
            >
              Thêm
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm ..."
              className="border border-black rounded h-[35px] pl-4 pr-10"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <i
              className="fa-solid fa-magnifying-glass absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={handleSearchProducts}
            ></i>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-center">Tên</th>
              <th className="py-2 px-4 border-b text-center">Ảnh</th>
              <th className="py-2 px-4 border-b text-center">Đơn giá</th>
              <th className="py-2 px-4 border-b text-center">
                Số lượng tồn kho
              </th>
              <th className="py-2 px-4 border-b text-center">Thời gian tạo</th>
              <th className="py-2 px-4 border-b text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Products) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b text-center">{product.id}</td>
                <td className="py-2 px-4 border-b text-center">
                  {product.product_name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <img
                    src={product.image}
                    className="h-16 w-16 object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">
                   <b>{product.unit_price}</b>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {product.stock_quantity}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {product.created_at}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(product)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose} className="custom-small-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex items-center">
              <label className="w-24">Tên:</label>
              <input
                type="text"
                className="w-full h-8 border border-black rounded px-2"
                onChange={handleChange}
                name="products_name"
                // value={inputValue.product_name}
              />
            </div>
            {error.product_name && (
              <span className="text-red-600 text-sm ml-24">
                {error.product_name}
              </span>
            )}

            <div className="flex items-center">
              <label className="w-24">Ảnh:</label>
              <input
                type="file"
                onChange={changeImage}
                className="w-full rounded"
                accept="image/*"
              />
            </div>
            {image && (
              <img
                src={image}
                alt="Product Image"
                className="w-52 h-56 mt-4 mx-auto"
              />
            )}

            <div className="flex items-center">
              <label className="w-24">Giá:</label>
              <input
                type="number"
                className="w-full h-8 border border-black rounded px-2"
                name="price"
                onChange={handleChange}
                // value={inputValue.unit_price}
              />
            </div>
            {error.unit_price && (
              <span className="text-red-600 text-sm ml-24">
                {error.unit_price}
              </span>
            )}

            <div className="flex items-center">
              <label className="w-24">Số lượng:</label>
              <input
                type="number"
                className="w-full h-8 border border-black rounded px-2"
                name="code"
                onChange={handleChange}
                // value={inputValue.stock_quantity}
              />
            </div>
            {error.stock_quantity && (
              <span className="text-red-600 text-sm ml-24">
                {error.stock_quantity}
              </span>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateProduct}>
            {editMode ? "Cập nhật" : "Thêm sản phẩm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

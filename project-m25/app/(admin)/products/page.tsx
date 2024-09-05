import Header from "../header/page";
import Sidebar from "../sidebar/page";

export default function Products() {
  // Giả lập danh sách sản phẩm
  const products = [
    {
      id: 1,
      name: "Sản phẩm 1",
      image: "/product1.jpg",
      price: 100000,
      stock: 50,
      createdAt: "2024-09-06",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      image: "/product2.jpg",
      price: 200000,
      stock: 30,
      createdAt: "2024-09-05",
    },
  ];

  return (
    <div className="flex">
    <Sidebar />
    <div className="ml-64 w-full">
      <Header title="Danh sách sản phẩm" />
      <div className="p-8">
        <h2 className="text-2xl mb-4">Danh sách sản phẩm</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-center">Tên</th>
              <th className="py-2 px-4 border-b text-center">Ảnh</th>
              <th className="py-2 px-4 border-b text-center">Đơn giá</th>
              <th className="py-2 px-4 border-b text-center">Số lượng tồn kho</th>
              <th className="py-2 px-4 border-b text-center">Thời gian tạo</th>
              <th className="py-2 px-4 border-b text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b text-center">{product.id}</td>
                <td className="py-2 px-4 border-b text-center">{product.name}</td>
                <td className="py-2 px-4 border-b text-center">
                  <img src={product.image} className="h-16 w-16 object-cover mx-auto" />
                </td>
                <td className="py-2 px-4 border-b text-center">{product.price}₫</td>
                <td className="py-2 px-4 border-b text-center">{product.stock}</td>
                <td className="py-2 px-4 border-b text-center">{product.createdAt}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded mr-2">Sửa</button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}

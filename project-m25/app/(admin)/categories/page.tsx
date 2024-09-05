import Header from "../header/page";
import Sidebar from "../sidebar/page";

export default function Categories() {
  // Giả lập danh sách danh mục
  const categories = [
    {
      id: 1,
      name: "Danh mục 1",
      description: "Mô tả cho danh mục 1",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Danh mục 2",
      description: "Mô tả cho danh mục 2",
      status: "Không hoạt động",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Header title="Quản lý danh mục sản phẩm" />
        <div className="p-8">
          <h2 className="text-2xl mb-4">Danh mục sản phẩm</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">ID Danh mục</th>
                <th className="py-2 px-4 border-b text-center">Tên danh mục</th>
                <th className="py-2 px-4 border-b text-center">Mô tả danh mục</th>
                <th className="py-2 px-4 border-b text-center">Trạng thái</th>
                <th className="py-2 px-4 border-b text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="py-2 px-4 border-b text-center">{category.id}</td>
                  <td className="py-2 px-4 border-b text-center">{category.name}</td>
                  <td className="py-2 px-4 border-b text-center">{category.description}</td>
                  <td className="py-2 px-4 border-b text-center">{category.status}</td>
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

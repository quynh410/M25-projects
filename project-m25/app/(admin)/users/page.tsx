import Header from "../header/page";
import Sidebar from "../sidebar/page";


export default function Users() {
  // Giả lập danh sách người dùng
  const users = [
    {
      id: 1,
      avatar: "/avatar1.jpg",
      username: "user1",
      email: "nguoidung1@example.com",
      password: "password123",
      address: "Địa chỉ 1",
      createdAt: "2024-09-06",
    },
    {
      id: 2,
      avatar: "/avatar2.jpg",
      username: "user2",
      email: "nguoidung2@example.com",
      password: "password456",
      address: "Địa chỉ 2",
      createdAt: "2024-09-05",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Header title="Quản lý người dùng" />
        <div className="p-8">
          <h2 className="text-2xl mb-4">Danh sách người dùng</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">ID</th>
                <th className="py-2 px-4 border-b text-center">Hình đại diện</th>
                <th className="py-2 px-4 border-b text-center">Tên đăng nhập</th>
                <th className="py-2 px-4 border-b text-center">Email</th>
                <th className="py-2 px-4 border-b text-center">Mật khẩu</th>
                <th className="py-2 px-4 border-b text-center">Địa chỉ</th>
                <th className="py-2 px-4 border-b text-center">Thời gian tạo</th>
                <th className="py-2 px-4 border-b text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b text-center">{user.id}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <img src={user.avatar}  className="h-16 w-16 object-cover mx-auto rounded-full" />
                  </td>
                  <td className="py-2 px-4 border-b text-center">{user.username}</td>
                  <td className="py-2 px-4 border-b text-center">{user.email}</td>
                  <td className="py-2 px-4 border-b text-center">{user.password}</td>
                  <td className="py-2 px-4 border-b text-center">{user.address}</td>
                  <td className="py-2 px-4 border-b text-center">{user.createdAt}</td>
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

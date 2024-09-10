"use client"; // Đánh dấu đây là Client Component

import store from "@/app/reducers/store";
import { Provider } from "react-redux";
// Đảm bảo đường dẫn đến store là chính xác

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
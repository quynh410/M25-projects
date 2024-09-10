"use client";
import store from "@/app/reducers/store";
import React from "react";
import { Provider } from "react-redux";

export default function GlobalProvider({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}

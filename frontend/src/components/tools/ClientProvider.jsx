"use client";

import { Provider } from "react-redux";
import store from "../../../store";
import GetUserLayout from "@/components/tools/getUserLayout";

export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      <GetUserLayout>{children}</GetUserLayout>
    </Provider>
  );
}

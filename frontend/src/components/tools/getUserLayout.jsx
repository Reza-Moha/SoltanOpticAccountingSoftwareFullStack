import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "@/utils/authActions";

export default function GetUserLayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);
  return children;
}

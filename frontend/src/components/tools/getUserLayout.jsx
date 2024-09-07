import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "@/utils/authActions";

export default function GetUserLayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUser() {
      await dispatch(fetchUserProfile());
    }
    getUser();
  }, []);
  return children;
}

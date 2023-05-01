import { Outlet } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export default function PrivatePage() {
  const { isVerified } = useAuth();

  return (
    <div>{isVerified ? <Outlet /> : <div> Please Login to see Blogs</div>}</div>
  );
}

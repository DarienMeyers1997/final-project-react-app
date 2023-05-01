import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { removeUserToken } from "../Auth/authLocalStorage";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const { isVerified, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logoutResult = await logout();
    if (logoutResult) navigate("/login");
  };
  return (
    <nav>
      <Link to="/">Home</Link>
      {"    "}
      {isVerified && <Link to="/home/blog-form">Create New Blog</Link>} {"    "}
      {isVerified && <button onClick={handleLogout}>Logout</button>}{" "}
      {!isVerified && <Link to="/register">Register</Link>}
      {"  "}
      {!isVerified && <Link to="/login">Login</Link>}
    </nav>
  );
}
//es6 syntax
export default NavBar;
//module.exports es5 syntax

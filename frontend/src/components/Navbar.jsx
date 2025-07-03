import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AppContent } from "../context/AppContent";

const Navbar = () => {
  const { user, logout } = useContext(AppContent);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex justify-between py-4 px-8">
      <div>
        <Link to="/">Shortly</Link>
      </div>
      <div className="flex gap-4">
        {!user ? (
          <>
            <NavLink
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md"
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md"
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// Packages
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/index";

function Navbar() {
  const { user } = isAuthenticated();
  const navigate = useNavigate();
  const handleSignout = () => {
    signout(() => {
      return navigate("/signin", { replace: true });
    });
  };
  return (
    <div
      id="navbar"
      className="bg-light-yellow flex justify-between items-center h-16 fixed top-0 w-full"
    >
      <nav
        id="navbar_links"
        className=" flex justify-center md:gap-x-32 lg:gap-x-44 items-center text-white list-none font-sans px-3"
      >
        <li>
          <Link
            className="px-4 py-2 rounded-2xl transition-colors duration-150 ease-in border-none focus:outline-none text-black hover:bg-black hover:text-white"
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="px-4 py-2 rounded-2xl transition-colors duration-150 ease-in border-none focus:outline-none text-black hover:bg-black hover:text-white"
            to="/cars"
          >
            Cars
          </Link>
        </li>
        {isAuthenticated() && (
          <li>
            <Link
              className="px-4 py-2 rounded-2xl transition-colors duration-150 ease-in border-none focus:outline-none text-black hover:bg-black hover:text-white"
              to={user.role === 1 ? "/admin/dashboard" : "/user/dashboard"}
            >
              Dashboard
            </Link>
          </li>
        )}
      </nav>

      {!isAuthenticated() && (
        <div
          id="header_register_container"
          className="flex items-center text-black font-sans gap-2 md:gap-x-10"
        >
          <Link className="font-semibold focus:outline-none" to="/signin">
            Login
          </Link>
          <Link to="/signup">
            <button className="hover:text-white hover:bg-orange-500 px-4 py-1 rounded-2xl mr-2 transition-colors duration-150 ease-in font-bold focus:outline-none">
              Register
            </button>
          </Link>
        </div>
      )}
      {isAuthenticated() && (
        <button
          onClick={() => {
            handleSignout();
          }}
          className="text-white bg-orange-500 px-4 py-1 rounded-2xl mr-2 transition-colors duration-150 ease-in focus:outline-none"
        >
          Signout
        </button>
      )}
    </div>
  );
}

export default Navbar;

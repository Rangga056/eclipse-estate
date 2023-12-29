import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md font-poppins">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-lg flex flex-wrap items-center">
            <img
              src={logo}
              alt="logo"
              className="rounded-[50%] sm:w-7 sm:h-7 w-8 h-8 mr-1 object-cover object-center"
            />
            <div className="sm:flex flex-wrap hidden">
              <span className="light-green-text">Eclipse</span>
              <span className="text-slate-700">Estate</span>
            </div>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            autoComplete="off"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-44 sm:w-80"
          />
          <FaSearch className="text-start-500" />
        </form>
        <ul className="flex items-center sm:gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline underline-offset-4">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline underline-offset-4">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-9 w-9 object-cover object-center"
              />
            ) : (
              <li className="hover:underline underline-offset-4">SignIn</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;

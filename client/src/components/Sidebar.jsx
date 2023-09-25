import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { FiBell, FiPlusSquare } from "react-icons/fi";
import { HiMiniHome } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { SlLogout } from "react-icons/sl";

function Navbar() {
  return (
    <nav className="h-screen border-r-4 border-slate-600 w-64 flex flex-col items-start justify-evenly">
      <div className="mx-2">
        <Link to="/">
          <h1 className="font-bold text-2xl p-3">ConnectX</h1>
        </Link>
      </div>

      <div className="flex flex-col items-center mx-2">
        <ul className="w-60">
          <li className="hover:bg-slate-800 rounded-md my-1">
            <Link to="/">
              <SidebarItem
                icon={<HiMiniHome style={{ fontSize: "2rem" }} />}
                name="Home"
              />
            </Link>
          </li>

          <li className="hover:bg-slate-800 rounded-md my-1">
            <Link to="/search">
              <SidebarItem
                icon={<FaSearch style={{ fontSize: "2rem" }} />}
                name="Search"
              />
            </Link>
          </li>
          <li className="hover:bg-slate-800 rounded-md my-1">
            <Link to="/notifications">
              <SidebarItem
                icon={<FiBell style={{ fontSize: "2rem" }} />}
                name="Notifications"
              />
            </Link>
          </li>
          <li className="hover:bg-slate-800 rounded-md my-1">
            <Link to="/create">
              <SidebarItem
                icon={<FiPlusSquare style={{ fontSize: "2rem" }} />}
                name="Create"
              />
            </Link>
          </li>
          <li className="hover:bg-slate-800 rounded-md my-1">
            <Link to="/profile">
              <SidebarItem
                icon={<HiOutlineUserCircle style={{ fontSize: "2rem" }} />}
                name="Profile"
              />
            </Link>
          </li>
        </ul>
      </div>
      <div className="m-2">
        <button className="btn">
          <SlLogout />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

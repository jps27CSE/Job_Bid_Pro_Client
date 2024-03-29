import { Link, NavLink } from "react-router-dom";
import Brandlogo from "../../assets/brandLogo.png";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    axios
      .post("https://b8a11-server-side-jps27-cse.vercel.app/logout", user, {
        withCredentials: true,
      })
      .then((res) => console.log(res));
    logOut();
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/add_job">Add Job</NavLink>
      </li>
      <li>
        <NavLink to="/my_posted_jobs">My Posted Jobs</NavLink>
      </li>
      <li>
        <NavLink to="/my_bids">My Bids</NavLink>
      </li>
      <li>
        <NavLink to="/bid_requests">Bid Requests</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <img className="w-[40px]" src={Brandlogo} alt="" />
          <a className="btn btn-ghost normal-case text-xl">JobBidPro</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user && (
            <>
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar mr-2"
              >
                <div className="w-8  lg:w-10 rounded-full">
                  <img src={user.photoURL} />
                </div>
              </label>
              <div>
                <h1 className="text-sm md:text-xl lg:text-xl mr-2 ">
                  {user.displayName}
                </h1>
              </div>
            </>
          )}
          {!user ? (
            <Link to="/login">
              <button className="btn ">Login</button>
            </Link>
          ) : (
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

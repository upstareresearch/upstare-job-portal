import { Outlet } from "react-router";
import NavLink from "../components/NavLink";


const HomeLayout = () => {
  return (
    <>
      <div className="flex ">
        {/* Sidebar */}
        <div className="mt-15">
          <NavLink />
        </div>

        {/* Page Content */}
        <div className="flex-1  bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  )
};

export default HomeLayout;

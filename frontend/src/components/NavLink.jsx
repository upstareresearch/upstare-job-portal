import { ArrowUpRight, BriefcaseBusiness, FileText, Home, LayoutDashboard, Send, Settings, User, } from "lucide-react"
import { NavLink as RouterNavLink, useLocation, useNavigate, } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutApi } from '../features/Actions/userActions';


const navLink = [

    { label: "Home", icon: Home, to: "/home" },
    { label: "Dashboard", icon: LayoutDashboard, to: "/home/dashboard" },
    { label: "Profile", icon: User, to: "/home/profile" },
    { label: "Jobs", icon: BriefcaseBusiness, to: "/home/job" },
    { label: "Create Jobs", icon: BriefcaseBusiness, to: "/home/create-job" },
    { label: "Job Posts", icon: BriefcaseBusiness, to: "/home/job-post" },
    { label: "Applicants", icon: FileText, to: "/home/applicants" },
    { label: "Messages", icon: Send, to: "/home/messages" },
    { label: "Services", icon: ArrowUpRight, to: "/home/Services" },
    { label: "Settings", icon: Settings, to: "/home/settings" },

];


const NavLink = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { user } = useSelector((state) => state.user);
    const role = user?.role;


    const logoutUser = async () => {
        try {

            dispatch(userLogoutApi());
            navigate("/")

        } catch (error) {

            console.log("error in logout", error);
        }
    };

    return (
        <>
            <div className='h-full w-60 flex  flex-col  gap-10 shadow-2xl border-1 border-gray-300 font10 mt-10 pt-5 pl-3' >
                {navLink.map(({ label, icon: Icon, to }, idx) => {

                    if (role === "Job Seeker" & (label === "Create Jobs" || label === "Applicants"  || label === "Job Posts")) {
                        return null
                    }

                    return (
                        <RouterNavLink
                            key={label}
                            to={to}
                            className={({ isActive }) => `flex gap-5 pl-2 text-xl  opacity-[0.9] hover:scale-[0.9] transition font-bold ${to === location.pathname
                                ? "text-blue-500" : ""
                                }`}
                        >
                            <Icon />
                            <span>{label}</span>

                        </RouterNavLink>
                    )
                })}
                
                <div className='flex gap-5 pl-2' >
                    <h1 className='text-2xl text-red-600' ><i className="ri-logout-circle-line"></i></h1>
                    <button
                        className='font-bold text-xl opacity-[0.9] text-red-600 underline hover:scale-[0.9] transition '
                        onClick={logoutUser}
                    >LogOut</button>
                </div>
            </div>
        </>
    )
}

export default NavLink;

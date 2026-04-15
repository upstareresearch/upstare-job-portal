import { useDispatch } from "react-redux"
import AppRouter from "./router/AppRouter"
import { addUser } from "./features/Reducers/userSlice";
import { useEffect } from "react";
import { axiosInstance } from "./config/axiosinstance";
import upstarelog from './images/hd-logo.png'


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/api/user/me");
        if (res) {
          dispatch(addUser(res?.data?.user))
        }
      } catch (error) {
        console.log("/me api error", error)
      }
    })()
  }, [dispatch]);

  return (
    <>
      <section className="w-full " >
        <div className="h-20 w-50 flex items-center pl-10 font-bold absolute top-3 left-7  border-1 border-gray-300 rounded-lg z-[999] bg-white" >
          <img
            className="h-18 w-70 absolute left-0 rounded-lg "
            src={upstarelog} alt="" />
        </div>
        <AppRouter />
      </section>
    </>
  );
};

export default App

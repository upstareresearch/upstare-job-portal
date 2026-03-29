import { useState } from "react";
import bgimage from "../images/bg-login.jpg"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userLoginApi } from "../features/Actions/userActions";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const LoginPage = ({ setToggle }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [role, setrole] = useState("Job Seeker");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const userData = {
        ...data, role
      }

      const response = await dispatch(userLoginApi(userData));
      if (response.success) {
        console.log("user is login");
        navigate("/home");
        toast.success("Login successfully ✅ ");
      }

    } catch (error) {
      console.log("error in login", error)
      toast.error(error?.response?.message || "Login Failed");

    } finally {
      setLoading(false);
      reset();
    }
  }

  return (
    <>
      <section className='min-h-screen w-screen flex items-center justify-center shadow-lg ' >

        {/* Background Image */}
        <img className='h-screen w-screen absolute bg-cover bg-center'
          src={bgimage} alt="" />
        <div className='h-100 w-130 rounded-sm bg-[#59BDBB] border-1 border-white z-[999]' >

          {/* Login form */}
          <form onSubmit={handleSubmit(onSubmit)}
            className='h-[80%] w-full flex flex-col items-center justify-center ' >
            <h1 className="font-bold text-3xl" >Login</h1>

            {/* Role options */}
            <div className="flex gap-10 mt-4 " >
              <button
                type="button"
                onClick={() => setrole("Job Seeker")}
                className={`px-5 py-1 rounded-sm border-1
              ${role === "Job Seeker" ? "bg-[#175898]" : "bg-[#CBF1EE]"}
              `}
              >Job Seeker</button>
              <button
                type="button"
                onClick={() => setrole("Employer")}
                className={`px-5 py-1  rounded-sm border-1
              ${role === "Employer" ? "bg-[#175898]" : "bg-[#CBF1EE]"}
              `}
              >Employer</button>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center gap-4 pt-7 ">
              <h1 className="text-xl" ><i className="ri-mail-fill"></i></h1>
              <input
                {...register("email", { required: "Email is required" })}
                className='border-2 border-black px-5 py-2 rounded-lg outline-none'
                placeholder='email'
                type="email" />
            </div>
            {errors.email && (
              <span className="text-red-500" >{errors.email.message}</span>
            )}

            {/* password */}
            <div className="flex items-center justify-center gap-4 pt-7  ">
              <h1 className="text-xl" ><i className="ri-lock-fill"></i></h1>
              <input
                {...register("password", { required: "Password is required" })}
                className='border-2 border-black px-5 py-2 rounded-lg outline-none'
                placeholder='password'
                type="password" />
            </div>
            {errors.password && (
              <span className="text-red-500" >{errors.password.message}</span>
            )}

            {/* Button */}
            <button disabled={loading}
              className='border-2 px-8 py-2 rounded-sm font-bold text-white bg-black mt-5 cursor-pointer hover:bg-[#CBF1EE] hover:text-black '
            >{loading ? "Loading...." : "Login"}
            </button>
          </form>

          {/* Logos */}
          <div className="flex items-center justify-center gap-2 " >
            <h1 className="text-4xl  hover:text-3xl " ><i className="ri-facebook-box-fill"></i></h1>
            <h1 className="text-4xl  hover:text-3xl " ><i className="ri-instagram-fill"></i></h1>
            <h1 className="text-4xl  hover:text-3xl " ><i className="ri-google-fill"></i></h1>
          </div>

          {/* switch button */}
          <div className="flex flex-col items-center justify-center text-center z-[999]" >
            <span className="flex gap-2 " >
              Don't have an account?
              <p className="text-blue-800 "
                onClick={() => setToggle((prev) => !prev)}
              >Sign Up</p>
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginPage;

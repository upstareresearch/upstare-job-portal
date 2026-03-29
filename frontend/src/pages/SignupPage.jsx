import { userSignupApi } from "../features/Actions/userActions";
import bgimage from "../images/bg-login.jpg"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


const SignupPage = ({ setToggle }) => {

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
      const res = await dispatch(userSignupApi(userData));
      if (res.success) {
        navigate("/")
        console.log("user is Registered");
        toast.success("Registered Successfully ✅ ");
      }

    } catch (error) {
      console.log("error in submiting",error);
      toast.error(error?.res?.message || "Fail in signup");

    }finally{
      setLoading(false);
      reset();
    }

  }

  return (
    <>
      <section className=' h-screen w-screen flex items-center justify-center shadow-lg ' >

        {/* Background Image */}
        <img className='h-screen w-screen absolute bg-cover bg-center'
          src={bgimage} alt="" />

        {/* sign up form */}
        <div className='h-150 w-130 rounded-sm bg-[#59BDBB] z-[999]' >
          <form onSubmit={handleSubmit(onSubmit)}
            className='h-[88%] w-full flex flex-col items-center justify-center  ' >
            <h1 className="font-bold text-3xl" >Register</h1>

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

            {/* Email  */}
            <div className="flex items-center justify-center gap-4 pt-3 ">
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

            {/* Mobile */}
            <div className="flex items-center justify-center gap-4 pt-3 ">
              <h1 className="text-xl" ><i className="ri-cellphone-fill"></i></h1>
              <input
                {...register("mobile", { required: "Mobile number is required" })}
                className='border-2 border-black px-5 py-2 rounded-lg outline-none'
                placeholder='Mobile'
                type="numder" />
            </div>
            {errors.mobile && (
              <span className="text-red-500" >{errors.mobile.message}</span>
            )}

            {/* Password */}
            <div className="flex items-center justify-center gap-4 pt-3 ">
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

            {/* Full Name */}
            <div className="flex items-center justify-center gap-4 pt-3 ">
              <h1 className="text-xl" ><i className="ri-user-fill"></i></h1>
              <input
                {...register("fullName", { required: "Full name is required" })}
                className='border-2 border-black px-5 py-2 rounded-lg outline-none'
                placeholder='Full Name'
                type="text" />
            </div>
            {errors.fullName && (
              <span className="text-red-500" >{errors.fullName.message}</span>
            )}

            {/* username */}
            <div className="flex items-center justify-center gap-4 pt-3 pb-3 " >
              <h1 className="text-xl" ><i className="ri-user-fill"></i></h1>
              <input
                {...register("username", { required: "Username is required" })}
                className='border-2 border-black px-5 py-2 rounded-lg outline-none'
                placeholder='username'
                type="text" />
            </div>
            {errors.username && (
              <span className="text-red-500" >{errors.username.message}</span>
            )}

            {/* Sign up button */}
            <button
            disabled={loading}
              className='border-2 px-8 py-2 rounded-sm font-bold text-white cursor-pointer bg-black hover:bg-[#CBF1EE] hover:text-black '
            >{loading ? "Loading....":"Signup"}</button>
          </form>

          {/* Logos */}
          <div className="flex items-center justify-center gap-2 " >
            <h1 className="text-4xl hover:text-3xl " ><i className="ri-facebook-box-fill"></i></h1>
            <h1 className="text-4xl hover:text-3xl " ><i className="ri-instagram-fill"></i></h1>
            <h1 className="text-4xl hover:text-3xl " ><i className="ri-google-fill"></i></h1>
          </div>

          {/* Switch button */}
          <div className="flex flex-col items-center justify-center text-center z-[999]" >
            <span className="flex gap-2 " >
              Have an account?
              <p className="text-blue-800"
                onClick={() => setToggle((prev) => !prev)}
              >login</p>
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignupPage;

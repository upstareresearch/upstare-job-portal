import { useForm } from 'react-hook-form';
import { createProfileApi, getProfileApi, updateProfileApi } from '../apis/profileApi';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

const ProfilePage = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [profile, setProfile] = useState(null)
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);
  const [previewResume, setPreviewResume] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("photo", data.photo[0]);
    formData.append("coverImage", data.coverImage[0]);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("number", data.number);
    formData.append("description", data.description);
    formData.append("dob", data.dob);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("languages", data.languages);
    formData.append("qualification", data.qualification);
    formData.append("experience", data.experience);
    formData.append("resume", data.resume[0])

    let respones;
    if (profile) {
      respones = await updateProfileApi(formData);
      toast.success("Profile updated ✅ ")
    } else {
      respones = await createProfileApi(formData);
      toast.success("Profile created successfully ✅ ");
    }
  };

  useEffect(() => {
    async function fetchProfile() {

      const data = await getProfileApi();
      const profile = data.profile

      setProfile(profile)
      setPreviewPhoto(profile.photoUrl);
      setPreviewCoverImage(profile.coverImageUrl);
      setPreviewResume(profile.resumeUrl)

      reset({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        number: profile.number || "",
        description: profile.description || "",
        dob: profile.dob ? profile.dob.split("T")[0] : "",
        age: profile.age || "",
        gender: profile.gender || "",
        languages: profile.languages || "",
        qualification: profile.qualification || "",
        experience: profile.experience || "",
      });
    }
    fetchProfile();
  }, []);

  return (
    <>
      <section className='min-h-screen w-full bg-gray-200 rounded-lg pt-10 pl-30 pr-30 '  >
        <h1 className='text-3xl mb-10  text-center font-bold text-[#0A3D4C] font7 ' >PROFILE SETTINGS</h1>
        <div className='min-h-screen w-full bg-[#FFFFFF] mb-10 ' >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='h-full w-full flex flex-col items-center justify-center'
          >
            <h1 className='text-3xl pt-4  mb-4 ml-7 ' >Basic Informations</h1>
            <div className=' h-60 w-full flex items-center justify-center gap-10 p-5 '  >

              {/* Uploaded photo */}
              <div className='h-40 w-50  flex flex-col ml-10' >
                <label htmlFor="photo" className='mb-3' >Your Uploaded Photo</label>
                <div className='h-full w-full flex items-center justify-center text-center rounded-lg border-1 border-[#F9F9F9] bg-gray-100 relative ' >
                  {previewPhoto ? (
                    <div className='h-full w-full' >
                      <img
                        className='h-full w-full bg-cover bg-center rounded-sm hover:scale-[1.1] transition '
                        src={previewPhoto} alt="profile" />
                    </div>
                  ) : (
                    <h1 className='z-[1]' >Photo Not Uploaded</h1>
                  )
                  }
                </div>
              </div>

              {/*Uploaded Cover Image */}
              <div className='h-40 w-160  flex flex-col' >
                <label htmlFor="coverImage" className='mb-3'  >Your uplaoded Cover Image</label>
                <div className='h-full w-130 flex items-center justify-center text-center rounded-lg border-1 border-[#F9F9F9] bg-gray-100 relative' >
                  {previewCoverImage ? (
                    <div className='h-full w-full' >
                      <img
                        className='h-full w-full bg-cover bg-center rounded-sm hover:scale-[1.1] transition '
                        src={previewCoverImage} alt="profile" />
                    </div>
                  ) : (
                    <h1 className='z-[1]' >Cover Image is not Upoaded</h1>
                  )}
                </div>
              </div>
            </div>
            <div className=' h-30 w-full flex items-center justify-center gap-20 mt-4' >

              {/* Profile photo */}
              <div className='h-15 w-100 flex flex-col ' >
                <label htmlFor="photo" >Upload Photo</label>
                <input
                  {...register("photo")}
                  className='px-3 py-3  text-center  rounded-lg border-1 border-[#F9F9F9] bg-gray-100'
                  type="file" id='photo' placeholder='image' />
                <h1>Maximum file size: 1400kb.</h1>
              </div>

              {/* Cover Image */}
              <div className='h-15 w-100 flex flex-col ' >
                <label htmlFor="coverImage" >Upoad Cover Image</label>
                <input
                  {...register("coverImage")}
                  className=' px-3 py-3 text-center  rounded-lg border-1 border-[#F9F9F9] bg-gray-100'
                  type="file" id='photo' placeholder='image' />
                <h1>The cover image size should be max 1920 x 400px</h1>
              </div>
            </div>
            <div className='h-30 w-full flex items-center justify-center gap-20 mt-4' >

              {/* First Name */}
              <div className='h-20 w-[38%] flex flex-col ' >
                <label htmlFor="firstName" className="block mb-1 font-medium" >First Name</label>
                <input
                  {...register("firstName", { required: "First Name is Required" })}
                  className='px-5 py-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                  type="text" id='firstName' placeholder='first Name' />
                {errors.firstName && (
                  <span>{errors.firstName.message}</span>
                )}
              </div>

              {/* Last Name */}
              <div className='h-20 w-[38%] flex flex-col ' >
                <label htmlFor="lastName" className="block mb-1 font-medium" >Last Name</label>
                <input
                  {...register("lastName", { required: "Last Name is Required" })}
                  className='px-5 py-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                  type="text" id='lastName' placeholder='Last Name' />
                {errors.lastName && (
                  <span className='text-red-500' >{errors.lastName.message}</span>
                )}
              </div>
            </div>
            <div className='h-30 w-full flex items-center justify-center gap-20' >

              {/* Email */}
              <div className='h-20 w-[38%] flex flex-col ' >
                <label htmlFor="email" className="block mb-1 font-medium" >Email Address</label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className='px-5 py-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                  type="text" id='email' placeholder='name@gmail.com' />
                {errors.email && (
                  <span className='text-red-500 ' >{errors.email.message}</span>
                )}
              </div>

              {/* Phone Number */}
              <div className='h-20 w-[38%] flex flex-col ' >
                <label htmlFor="number" className="block mb-1 font-medium" >Phone number</label>
                <input
                  {...register("number", { required: " Number is Required" })}
                  className='px-5 py-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                  type="tel" placeholder='Enter phone number' />
                {errors.number && (
                  <span className='text-red-500 ' >{errors.number.message}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className='h-50 w-full flex flex-col items-center jsutify-center ' >
              <label htmlFor="description" className="block mb-1 font-medium" >Description</label>
              <textarea
                {...register("description", { required: "Descriptions is Required" })}
                rows={7}
                className='h-40 w-[75%] px-4 pt-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                id="description" placeholder='Write a short bio or description' ></textarea>
              {errors.description && (
                <span className='text-red-500'>{errors.description.message}</span>
              )}
            </div>
            <div className='h-30 w-full flex items-center justify-center gap-20' >

              {/* Date of Bith */}
              <div className='h-20 w-[38%] flex flex-col ' >
                <label htmlFor="dob" className="block mb-1 font-medium" >Date of Birth</label>
                <input
                  {...register("dob", { required: "Date of Bith is Required" })}
                  className='px-5 py-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                  type="date" id='dob' placeholder='first Name' />
                {errors.dob && (
                  <span className='text-red-500' >{errors.dob.message}</span>
                )}
              </div>

              {/* Age */}
              <div className='h-20 w-[38%] flex flex-col ' >
                <label htmlFor="age" className="block mb-1 font-medium" >Age</label>
                <select
                  {...register("age", { required: "Age is Required" })}
                  className='px-5 py-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                >
                  <option value="18-24">18 - 24</option>
                  <option value="25-30">25 - 30</option>
                  <option value="31-40">31 - 40</option>
                  <option value="40+">40+</option>
                </select>
                {errors.age && (
                  <span className='text-red-500' > {errors.age.message}</span>
                )}
              </div>
            </div>
            <div className='h-30 w-full flex items-center justify-center gap-20' >

              {/* Gender */}
              <div className='h-20 w-[38%] flex flex-col ' >
                <label htmlFor="gender" className="block mb-1 font-medium" >Gender</label>
                <select
                  {...register("gender", { required: "Gender is Required" })}
                  className='px-5 py-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <span className='text-red-500' >{errors.gender.message}</span>
                )}
              </div>

              {/* Languages */}
              <div className='h-20 w-[38%] flex flex-col ' >
                <label className="block mb-1 font-medium">Languages</label>
                <select
                  {...register("languages", { required: "Languages is Required" })}
                  className='px-5 py-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Other">Other</option>
                </select>
                {errors.languages && (
                  <span className='text-red-500' >{errors.languages.message}</span>
                )}
              </div>
            </div>
            <div className='h-30 w-full flex items-center justify-center gap-20' >

              {/* Qualifications */}
              <div className='h-20 w-[38%] flex flex-col ' >
                <label className="block mb-1 font-medium">Qualification</label>
                <select
                  {...register("qualification", { required: "Qualifications is Required" })}
                  className='px-5 py-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                >
                  <option value="Bachelor Degree">Bachelor Degree</option>
                  <option value="Master Degree">Master Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Diploma">Diploma</option>
                </select>
                {errors.qualification && (
                  <span className='text-red-500' >{errors.qualification.message}</span>
                )}
              </div>

              {/* Years of Experience */}
              <div className='h-20 w-[38%] flex flex-col ' >
                <label className="block mb-1 font-medium">Years of Experience</label>
                <select
                  {...register("experience", { required: "Exprricence is Required" })}
                  className='px-5 py-3 rounded-sm outline-0 border-1 border-gray-300 bg-[#FFFFFF]'
                >
                  <option value="">Select an option</option>
                  <option value="0-1">0-1</option>
                  <option value="2-5">2-5</option>
                  <option value="6-10">6-10</option>
                  <option value="10+">10+</option>
                </select>
                {errors.experience && (
                  <span className='text-red-500' >{errors.experience.message}</span>
                )}
              </div>
            </div>
            <div className='h-40 w-full flex items-center justify-center gap-20' >

              {/* Resume */}
              <div className='h-30 w-full mt-5 ml-22 flex flex-col  ' >
                <label htmlFor="resume" className='mb-4'  >Upoad Resume</label>
                <input
                  {...register("resume")}
                  className='w-50 text-center px-2 py-2 rounded-lg border-1 border-[#F9F9F9] bg-gray-100'
                  type="file" id='photo' placeholder='Resume' />
                <h1 className='mt-3' >Upload File: PDF</h1>
              </div>

              {/*Uploaded Resume */}
              <div className='h-30 w-full mt-5 ml-22 flex flex-col ' >
                <label htmlFor="resume" className='mb-4'  >Uploaded  Resume</label>
                <div className='h-10 w-50 text-center  rounded-lg border-1 border-[#F9F9F9] bg-gray-100' >
                  {previewResume ? (
                    <div className='h-10  flex flex-col items-center justify-center ' >
                      <a href={previewResume}
                        className='w-60 text-center px-4 py-4 rounded-lg border-1 border-[#F9F9F9] bg-gray-100'
                        download
                        target="_blank" rel="noopener noreferrer">
                        {profile?.resumeUrl.split("/").pop()}
                      </a>
                      <h1>View the Resume</h1>
                    </div>
                  ) : (
                    <h1 className='pt-1' >Resume Not Uploaded</h1>
                  )}
                </div>

              </div>
            </div>

            <button className=' px-4 py-2 text-white bg-[#0A3D4C] rounded-sm mt-10 mb-10 hover:bg-[#00BBA7] hover:scale-[1.1] transition ' >Save & Update</button>
          </form>
        </div>
      </section>
        <Contact />
        <Footer />
    </>
  )
}

export default ProfilePage;

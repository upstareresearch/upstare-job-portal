import Homepng from '../images/Home-page1.webp'
import { useEffect, useState } from "react";
import { getAllJobApi } from '../apis/jobApi';
import { Link } from "react-router";
import Contact from '../components/Contact'
import Footer from '../components/Footer'



const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await getAllJobApi();
        setJobs(res.data.job);

      } catch (err) {
        console.log("Error while fetching jobs", err);
      }
    }

    fetchJobs();
  }, []);


  return (
    <>
      <section className=' w-full flex flex-col bg-[#FAF7F0] ' >
        <div className="h-screen w-full flex flex-col-reverse md:flex-row  items-center justify-evenly bg-white  md:px-16 ">

          {/* Left Content */}
          <div className=" h-[80%] w-[60%] flex-1 flex flex-col items-start justify-center bg-white px-5 px-7 rounded  ">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight font6 ">
              Find Your <span className="text-[#0A3D4C]">Dream <span className='text-red-500' > Job </span> </span><br />
              With Your Interest<br />And Skills
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl font1 ">
              A job portal designed to connect talented job seekers with top employers. Users can create profiles, upload resumes, explore job listings, and apply with just one click. Employers can easily post jobs, manage applicants, and find the right talent efficiently.
            </p>
            <div className="flex flex-row items-center gap-6 mb-6">
              <button className="bg-[#0A3D4C] hover:bg-[#00BBA7] text-white font-semibold px-8 py-3 rounded-full shadow transition">
                Discover Jobs
              </button>
              <div className="bg-gray-100 px-6 py-2 rounded-xl flex flex-col items-center border shadow">
                <span className="font-bold text-[#0A3D4C] text-lg">200+</span>
                <span className="text-xs text-gray-500 font-semibold">Happy Active Users</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="h-full w-[60%]  flex-1 flex justify-center items-center bg-white  mb-8 md:mb-0 ml-20 ">
            <div className="h-[470px] w-[420px] bg-gradient-to-br from-white to-blue-50  rounded-3xl shadow-lg flex items-center justify-center relative">
              <img
                src={Homepng}
                alt="laptop"
                className="object-cover h-[90%] w-[90%] rounded-2xl hover:scale-[1.1] transition "
              />
              <div className="absolute top-10 right-6 bg-white border rounded-lg px-4 py-2 shadow flex items-center gap-2">
                <span className="bg-blue-100 text-[#0A3D4C] px-2 py-1 rounded-md text-xs font-bold">
                  ✅ 99% Job Success
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ----job--posts------- */}
        <div className="min-h-screen bg-[#FAF7F0]  py-10">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#0A3D4C] font7">
            AVAILABLE JOB OPENINGS
          </h1>

          <div className="w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8  ">
            {jobs.slice(0, 6).map((job) => (
              <div key={job._id} className="bg-white shadow-md p-5 rounded-lg hover:scale-[0.9] transition ">
                <h2 className="text-xl font-bold font7 text-[#0A3D4C] ">{job.title}</h2>
                <p className="text-gray-600">Company :- {job.company}</p>
                <p className="mt-2 text-sm">
                  📍 {job.location} | 💼 {job.jobType}
                </p>
                <p className="mt-1 text-sm text-green-600">
                  💰 {job.salary}
                </p>

                <p className="mt-3 text-gray-700 line-clamp-2">
                  {job.description}
                </p>

                <div className="mt-4">
                  <Link
                    to={`/home/jobs/details/${job._id}`}
                    className="block text-center bg-[#0A3D4C] text-white py-2 rounded hover:bg-[#00BBA7]"
                  >
                    View & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
      <Contact />
      <Footer />
    </>
  )
}

export default HomePage




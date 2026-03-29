import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { delelteJobPostApi, getMyJobPostApi } from "../apis/jobApi";
import { toast } from "react-toastify";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const JobPostPage = () => {
  const [myJobs, setMyJobs] = useState([]);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await getMyJobPostApi();
      setMyJobs(res.jobs);
    } catch (error) {
      console.log("Error fetching employer jobs", error);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job post?")) return;

    try {
      await delelteJobPostApi(id);
      toast.success("Job post deleted successfully ✅");
      fetchMyJobs();
    } catch (error) {
      toast.error("Failed to delete job ❌");
      console.log(error);
    }
  };

  return (
    <>
      <section className="w-full mx-auto mt-10 px-4 ">
        <h2 className="text-3xl font-bold font4 mb-6">My Job Posts</h2>

        {myJobs.length === 0 ? (
          <p className="text-center text-gray-600">No job posts created yet!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myJobs.map((job) => (
              <div key={job._id} className="bg-white shadow-md p-6 rounded-lg border hover:shadow-lg transition">
                {/* Job Header */}
                <h3 className="text-xl font-bold text-[#0A3D4C] font7">{job.title}</h3>
                <p className="text-gray-700 font-medium font9">{job.company}</p>
                <p className="text-sm text-gray-500 font1 ">{job.location}</p>

                {/* Details */}
                <div className="mt-3 text-sm text-gray-700 font2">
                  <p><span className="font-semibold">Salary:</span> {job.salary}</p>
                  <p><span className="font-semibold">Type:</span> {job.jobType}</p>
                  <p><span className="font-semibold">Qualification:</span> {job.qualification}</p>
                  <p><span className="font-semibold">Experience:</span> {job.experience}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  {/* View Applicants */}
                  <Link
                    to={'/home/applicants'}
                    className="text-blue-600 underline text-sm font7"
                  >
                    View Applicants →
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => deletePost(job._id)}
                    className="text-red-600 font-semibold hover:underline font2"
                  >
                    Delete ❌
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Posted on {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
      <Contact/>
      <Footer/>
    </>
  );
};

export default JobPostPage;


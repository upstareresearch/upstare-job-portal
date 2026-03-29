import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { applyJobApi } from "../apis/jobApi";
import { axiosInstance } from "../config/axiosinstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useSelector((state) => state.user);
  const role = user?.role;

  useEffect(() => {
    async function fetchJob() {
      const res = await axiosInstance.get(`/api/job/single/post/${id}`);
      setJob(res.data.job);
    }
    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  const applyJob = async () => {

    const respones = await applyJobApi({ jobId: id })
    if (respones) {
      toast.success("Applied Successfully ✅")
    }

  };

  const deleteJob = async() =>{

  };

  return (
    <>
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
        {/* Title & Company */}
        <h1 className="text-3xl font-bold font4">{job.title}</h1>
        <p className="text-lg font-medium text-gray-700 mt-1">{job.company}</p>

        {/* Location & Type */}
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {job.jobType}
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            {job.location}
          </span>
        </div>

        {/* Salary | Experience | Qualification */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-100 rounded-md p-4">
            <p className="text-xs text-gray-500 uppercase">Salary</p>
            <p className="font-semibold text-gray-800">{job.salary}</p>
          </div>
          <div className="bg-gray-100 rounded-md p-4">
            <p className="text-xs text-gray-500 uppercase">Experience</p>
            <p className="font-semibold text-gray-800">{job.experience}</p>
          </div>
          <div className="bg-gray-100 rounded-md p-4">
            <p className="text-xs text-gray-500 uppercase">Qualification</p>
            <p className="font-semibold text-gray-800">{job.qualification}</p>
          </div>
        </div>

        {/* Skills */}
        <h2 className="text-lg font-semibold mt-6 text-[#0A3D4C]">Required Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Description */}
        <h2 className="text-lg font-semibold mt-6 text-[#0A3D4C]">Job Description</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">{job.description}</p>

        {/* Due Date */}
        {job.dueDate && (
          <p className="mt-4 text-sm text-red-600 font-medium">
            Apply Before: {new Date(job.dueDate).toLocaleDateString()}
          </p>
        )}

        {/* Posted Info */}
        <p className="mt-2 text-xs text-gray-500">
          Posted on: {new Date(job.createdAt).toLocaleDateString()}
        </p>

        {/* Apply Button */}
        {role === "Job Seeker"  && (
          <button
            className="mt-8 w-full bg-[#0A3D4C] hover:bg-blue-900 text-white p-3 rounded-lg text-lg font-medium"
            onClick={applyJob}
          >
            Apply Now ✅
          </button>
        )}
        {role === "Admin" && (
          <button
            className="mt-8 w-full bg-red-800 hover:bg-red-500 hover:scale-[0.9] transition text-white p-3 rounded-lg text-lg font-medium  "
            onClick={deleteJob}
          >
            Delete Post
          </button>
        )}
      </section>

    </>
  );
};

export default JobDetailsPage;

import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createJobpostApi } from '../apis/jobApi';

const jobTypes = ["Full-Time", "Part-Time", "Internship", "Remote"];
const qualifications = ["Bachelor Degree", "Master's Degree", "Diploma"];
const Experience = ["Fresher", "0-1", "2-3", "3-4", "4-5"]

const CreateJobPage = () => {

    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [serverMsg, setServerMsg] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleAddSkill = (e) => {
        e.preventDefault();
        const skill = skillInput.trim();
        if (skill && !skills.includes(skill)) {
            setSkills([...skills, skill]);
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (skill) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setServerMsg("");

        try {
            const payload = { ...data, skills };
            const respones = await createJobpostApi(payload);
            if (respones) {
                setServerMsg("Job posted successfully ✅");
            }
            reset();
            setSkills([]);
        } catch (err) {
            setServerMsg("Error posting job. Check fields and try again.");
        }
        setLoading(false);
    };
    return (
        <>
            <section className='min-h-screen w-fullflex flex-col items-center justify-center bg-gray-100 ' >
                <div className=" h-full -w-full p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-10 bg-white">
                    <h2 className="text-2xl text-center font-bold mb-8 font4">
                        Create a New Job Posting
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full space-y-6">
                        <div className='  w-full flex items-center justify-center gap-10 ' >

                            {/* Title */}
                            <div className=' w-70  flex flex-col ' >
                                <label className="font-semibold">Job Title*</label>
                                <input
                                    {...register("title", { required: "Title is required" })}
                                    className="mt-1 w-full p-2 border rounded"
                                    placeholder="e.g. Frontend Developer"
                                />
                                {errors.title && (
                                    <span className="text-red-500 text-sm">{errors.title.message}</span>
                                )}
                            </div>

                            {/* Company */}
                            <div className=' w-70  flex flex-col ' >
                                <label className="font-semibold">Company Name*</label>
                                <input
                                    {...register("company", { required: "Company is required" })}
                                    className="mt-1 w-full p-2 border rounded"
                                    placeholder="e.g. Google"
                                />
                                {errors.company && (
                                    <span className="text-red-500 text-sm">{errors.company.message}</span>
                                )}
                            </div>
                        </div>

                        <div className=' w-full flex items-center justify-center gap-10  ' >
                            {/* Location */}
                            <div className=' w-70  flex flex-col ' >
                                <label className="font-semibold">Location*</label>
                                <input
                                    {...register("location", { required: "Location is required" })}
                                    className="mt-1 w-full p-2 border rounded"
                                    placeholder="e.g. Bhopal"
                                />
                                {errors.location && (
                                    <span className="text-red-500 text-sm">{errors.location.message}</span>
                                )}
                            </div>

                            {/* Salary */}
                            <div className=' w-70 flex flex-col ' >
                                <label className="font-semibold">Salary*</label>
                                <input
                                    {...register("salary", { required: "Salary is required" })}
                                    className="mt-1 w-full p-2 border rounded"
                                    placeholder="e.g. 10 LPA"
                                />
                                {errors.salary && (
                                    <span className="text-red-500 text-sm">{errors.salary.message}</span>
                                )}
                            </div>
                        </div>

                        <div className='w-full flex items-center justify-center gap-10 ' >

                            {/* JobType */}
                            <div className=' w-70  flex flex-col ' >
                                <label className="font-semibold">Job Type*</label>
                                <select
                                    {...register("jobType", { required: "Job Type is required" })}
                                    className="mt-1 w-full p-2 border rounded"
                                >
                                    <option value="">Select type</option>
                                    {jobTypes.map((jt) => (
                                        <option key={jt} value={jt}>
                                            {jt}
                                        </option>
                                    ))}
                                </select>
                                {errors.jobType && (
                                    <span className="text-red-500 text-sm">{errors.jobType.message}</span>
                                )}
                            </div>

                            {/* Qualification */}
                            <div className=' w-70  flex flex-col ' >
                                <label className="font-semibold">Qualification*</label>
                                <select
                                    {...register("qualification", { required: "Qualification is required" })}
                                    className="mt-1 w-full p-2 border rounded"
                                >
                                    {qualifications.map((q) => (
                                        <option key={q} value={q}>
                                            {q}
                                        </option>
                                    ))}
                                </select>
                                {errors.qualification && (
                                    <span className="text-red-500 text-sm">{errors.qualification.message}</span>
                                )}
                            </div>
                        </div>

                        <div className='  w-full flex items-center justify-center gap-10 ' >

                            {/* Experience */}
                            <div className=' w-70  flex flex-col ' >
                                <label className="font-semibold">Experience*</label>
                                <select
                                    {...register("experience", { required: "Experience is required" })}
                                    className="mt-1 w-full p-2 border rounded"
                                >
                                    {Experience.map((ex) => (
                                        <option key={ex} value={ex}>
                                            {ex}
                                        </option>
                                    ))}
                                </select>
                                {errors.experience && (
                                    <span className='text-red-500 text-sm' >{errors.experience.message}</span>
                                )}
                            </div>

                            {/* Due Date */}
                            <div className=' w-70  flex flex-col ' >
                                <label className="font-semibold">Application Due Date*</label>
                                <input
                                    type="date"
                                    {...register("dueDate")}
                                    className="mt-1 w-full p-2 border rounded"
                                />
                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="font-semibold">
                                Skills* (Type and Add each skill)
                            </label>
                            <div className="flex gap-2 mt-1 mb-3">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    className="p-2 border rounded w-full"
                                    placeholder="Type a skill (e.g. React)"
                                />
                                <button
                                    className="px-4 py-2 bg-[#0A3D4C] text-white rounded hover:bg-[#00BBA7] hover:scale-[0.9] transition  "
                                    onClick={handleAddSkill}
                                    type="button"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            className="ml-2 text-red-500 font-bold "
                                            onClick={() => handleRemoveSkill(skill)}
                                        >
                                            x
                                        </button>
                                    </span>
                                ))}
                            </div>
                            {skills.length === 0 && (
                                <span className="text-red-500 text-sm">At least one skill required</span>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="font-semibold">Description*</label>
                            <textarea
                                {...register("description", { required: "Description is required" })}
                                className="mt-1 w-full p-2 border rounded"
                                rows={4}
                                placeholder="Full job description (responsibilities, perks, expectations...)"
                            />
                            {errors.description && (
                                <span className="text-red-500 text-sm">{errors.description.message}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#0A3D4C] text-white font-semibold rounded mt-6 hover:bg-[#00BBA7] hover:scale-[0.9]  transition"
                            disabled={loading}
                        >
                            {loading ? "Posting..." : "Post Job"}
                        </button>
                        {serverMsg && (
                            <div className="mt-3 text-center font-medium text-blue-700">{serverMsg}</div>
                        )}
                    </form>
                </div>
                <Contact />
                <Footer />
            </section>
        </>
    )
}

export default CreateJobPage;


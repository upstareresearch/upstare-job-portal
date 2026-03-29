import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { singleApplicantApi } from "../apis/applicantsApi";

const ApplicantDetailsPage = () => {
    const { id } = useParams();
    const [applicant, setApplicant] = useState(null);

    useEffect(() => {
        const fetchApplicantDetails = async () => {
            try {
                const { data } = await singleApplicantApi(id);
                setApplicant(data.applicant);
            } catch (error) {
                console.log("Error fetching applicant:", error);
            }
        };

        fetchApplicantDetails();
    }, [id]);

    if (!applicant) {
        return (
            <div className="flex justify-center items-center h-screen text-xl text-gray-600">
                Loading Applicant Details...
            </div>
        );
    }

    const profile = applicant.profile;
    const job = applicant.job;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg border border-gray-200">
            {/* Header */}
            <div className="flex items-center gap-4">
                <img
                    src={profile?.photoUrl || "https://via.placeholder.com/100"}
                    alt="profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#0A3D4C]"
                />
                <div>
                    <h2 className="text-3xl font-bold text-[#0A3D4C]">
                        {profile?.firstName} {profile?.lastName}
                    </h2>
                    <p className="text-gray-600">{job?.title} Applicant</p>
                </div>
            </div>

            {/* Job Info */}
            <div className="mt-6 bg-[#F2FAFA] p-4 rounded-lg border">
                <h3 className="font-semibold text-[#0A3D4C] text-lg mb-2">
                    Applied Job Details:
                </h3>
                <p>🧑‍💼 <strong>Role:</strong> {job?.title}</p>
                <p>🏢 <strong>Company:</strong> {job?.company}</p>
                <p>📍 <strong>Location:</strong> {job?.location}</p>
            </div>

            {/* Applicant Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p><strong>📧 Email:</strong> {profile?.email}</p>
                    <p><strong>📱 Phone:</strong> {profile?.number}</p>
                    <p><strong>🎓 Qualification:</strong> {profile?.qualification}</p>
                    <p><strong>🧑‍🏫 Experience:</strong> {profile?.experience} Years</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p><strong>🗓 Date of Birth:</strong> {profile?.dob?.substring(0, 10)}</p>
                    <p><strong>🔞 Age Group:</strong> {profile?.age}</p>
                    <p><strong>⚥ Gender:</strong> {profile?.gender}</p>
                    <p><strong>🌐 Languages:</strong> {profile?.languages}</p>
                </div>
            </div>

            {/* Resume */}
            <div className="mt-6 p-4 bg-[#EEF9FF] border rounded-lg flex justify-between items-center">
                <div>
                    <strong>📄 Resume:</strong>
                </div>
                <a
                    href={applicant.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0A3D4C] text-white px-4 py-2 rounded-lg hover:bg-[#064e61] transition"
                >
                    View Resume
                </a>
            </div>

            {/* Description */}
            <div className="mt-6 p-4 bg-white border rounded-lg shadow-sm">
                <p className="text-gray-700 whitespace-pre-line">
                    {profile?.description}
                </p>
            </div>
        </div>
    );
};

export default ApplicantDetailsPage;

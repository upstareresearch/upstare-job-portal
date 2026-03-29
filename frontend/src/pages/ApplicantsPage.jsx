import { useEffect, useState } from "react";
import { getMyApplicantsApi } from "../apis/applicantsApi";
import { Link } from "react-router";
import Footer from '../components/Footer'
import Contact from '../components/Contact'

const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const data = await getMyApplicantsApi();
        setApplicants(data.applicants);
      } catch (error) {
        console.log("Error loading applicants", error);
      }
    }
    fetchApplicants();
  }, []);

  return (
    <>
      <section className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 font4 border-b pb-3">
          Applicants List
        </h2>

        {applicants.length === 0 ? (
          <p className="text-center text-gray-500 font-medium py-10">
            No applicants have applied yet! 🙁
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applicants.map((item) => (
              <div
                key={item._id}
                className="p-5 bg-[#F8FBFC] border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* Job title */}
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-[#0A3D4C] font7">
                    {item.job?.title}
                  </h3>
                  <span className="text-sm text-gray-500">{item.job?.company}</span>
                </div>

                {/* Applicant details */}
                <div className="space-y-1 text-[15px] font2 ">
                  <p className="text-gray-700 font-medium">
                    👤 {item.profile?.firstName} {item.profile?.lastName}
                  </p>
                  <p className="text-gray-600">
                    📧 {item.applicant?.email}
                  </p>
                  <p className="text-gray-600">
                    📱 {item.applicant?.mobile}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={item.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    Resume
                  </a>

                  <Link
                    to={`/home/applicant/details/${item._id}`}
                    className="text-white bg-[#0A3D4C] px-3 py-1 rounded-lg text-sm hover:bg-[#09505f] transition-all"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
        <Contact />
        <Footer />
    </>
  );
};

export default ApplicantsPage;



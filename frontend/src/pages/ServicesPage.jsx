import React from 'react'
import image1 from '../images/service-page-1.avif'
import image2 from '../images/service-page-2.png'
import image3 from '../images/service-page-3.png'
import Footer from '../components/Footer';
import Contact from '../components/Contact';

const ServicesPage = () => {



  const categories = [
    {
      name: "Development & IT",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#14804A" />
          <path stroke="white" d="M8 12l2-2m0 0l2 2m-2-2v6" />
        </svg>
      ),
    },
    {
      name: "Marketing & Sales",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#14804A" />
          <circle cx="12" cy="12" r="3" stroke="white" strokeWidth={2} />
          <path stroke="white" d="M12 6v2" />
        </svg>
      ),
    },
    {
      name: "Customer Service",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#14804A" />
          <path stroke="white" d="M9 15a3 3 0 006 0" />
          <circle cx="9" cy="10" r="1" fill="white" />
          <circle cx="15" cy="10" r="1" fill="white" />
        </svg>
      ),
    },
    {
      name: "Design & Creative",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#14804A" />
          <path stroke="white" d="M8 16h8M9 8h6M12 8v8" />
        </svg>
      ),
    },
    {
      name: "Legal & Finance",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#14804A" />
          <path stroke="white" d="M8 12h8M12 8v8" />
        </svg>
      ),
    },
    {
      name: "Product Management",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#14804A" />
          <path stroke="white" d="M9 10h6M10 14h4" />
        </svg>
      ),
    },
    {
      name: "Writing & Translation",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#14804A" />
          <path stroke="white" d="M8 15h8M9 8h6" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <section className='min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF7F0] ' >
        <div className="h-[85%] w-[80%] flex items-center justify-center min-h-[70vh] bg-white">
          <div className="flex items-center bg-white p-10 md:p-16 rounded-xl">

            {/*------Left: Photo box------- */}
            <div className="mr-12">
              <div className="w-[370px] h-[470px] overflow-hidden rounded-2xl bg-[#FDF6EA] flex items-center justify-center relative">

                {/* Replace with your actual image path */}
                <img
                  src={image1}
                  alt="Person thinking"
                  className="w-full h-full object-cover "
                />

                {/* Optional: Decorative SVG yellow swirl can go here */}
              </div>
            </div>

            {/*------Right: Text & button------ */}
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-[#14804A] mb-3 font1 leading-snug underline">
                Read company reviews to avoid career mistakes
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-8">
                Read what employees are saying about companies.
              </p>
              <a
                href="/home"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold bg-[#14804A] text-white px-8 py-4 rounded-full text-lg transition hover:bg-[#116838]"
              >
                Explore Company Reviews
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width={24}
                  height={24}
                  className="ml-2"
                >
                  <path d="M14 2h4v4h-2V4.41l-7.29 7.3a1 1 0 01-1.42-1.42l7.3-7.29H14V2z"></path>
                  <path d="M17 10a1 1 0 00-1 1v6H4V4h6a1 1 0 000-2H4a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-7a1 1 0 00-1-1z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ----Next--page----- */}
        <div className="w-full flex items-center justify-center min-h-screen bg-[#FAF7F0]">
          <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full px-4">
            {/* Employer Card */}
            <div className="flex flex-col justify-between bg-white rounded-xl p-10 w-full md:w-1/2 shadow">
              <div>
                <h2 className="text-[2.2rem] font-bold mb-3 text-[#14804A]">For Employers</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Find professionals from around the world and across all skills.
                </p>
              </div>
              <div className="flex items-end justify-between mt-6">
                <button className="bg-[#14804A] text-white px-8 py-3 rounded-full text-lg font-semibold transition hover:bg-[#116838]">
                  Post Jobs
                </button>

                {/* Replace below with your SVG/PNG illustration */}
                <img src={image2} alt="Employer" className="w-48 h-36 object-contain" />
              </div>
            </div>

            {/* Candidate Card */}
            <div className="flex flex-col justify-between bg-white rounded-xl p-10 w-full md:w-1/2 shadow">
              <div>
                <h2 className="text-[2.2rem] font-bold mb-3 text-[#14804A]">For Candidate</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Build your professional profile, find new job opportunities.
                </p>
              </div>
              <div className="flex items-end justify-between mt-6">
                <button className="bg-[#14804A] text-white px-8 py-3 rounded-full text-lg font-semibold transition hover:bg-[#116838]">
                  Upload your CV
                </button>
                {/* Replace below with your SVG/PNG illustration */}
                <img src={image3} alt="Candidate" className="w-48 h-36 object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* ------Next--Page------ */}
        <div className="min-h-screen bg-[#FAF7F0] py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Popular category</h1>
            <p className="text-lg text-gray-600 mb-10">Find and hire professionals across all skills</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {categories.map((cat, idx) => (
                <div key={cat.name} className="flex flex-col items-start bg-[#F3F7F6] p-8 rounded-xl shadow transition hover:shadow-lg">
                  <div className="mb-6">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#14804A]">
                      {cat.icon}
                    </div>
                  </div>
                  <span className="text-xl text-gray-900 font-semibold">{cat.name}</span>
                </div>
              ))}
              {/* Last card: View all categories */}
              <div className="flex items-center justify-center bg-[#F3F7F6] p-8 rounded-xl shadow hover:shadow-lg">
                <a
                  href="/home/services"
                  className="text-lg font-medium text-[#14804A] underline hover:text-[#116838]">
                  View all categories
                </a>
              </div>
            </div>
          </div>
          {/* Optional: Add a scroll-up button if needed */}
        </div>
      </section>
      <Contact />
      <Footer />
    </>
  )
}

export default ServicesPage;

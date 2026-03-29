import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaBehance, FaDribbble, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const TAGS = [
    "UI/UX design",
    "Web design",
    "Design system",
    "Graphic design",
    "Other"
];

const Contact = () => {
    const [selectedTag, setSelectedTag] = useState("UI/UX design");
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;


    function handleTagClick(tag) {
        setSelectedTag(tag);
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    function handleSubmit(e) {
        e.preventDefault();
        emailjs.send(serviceId, templateId, form, publicKey).then((res) => {
            console.log("this the response", res)
        });
        alert("Message sent!");
        setForm({ name: "", email: "", message: "" });
    }

    return (
        <section className="h-screen w-full bg-gray-100 flex flex-col  items-center justify-center px-6 mb-10 py-12 gap-10 font1">
            <div className="h-[90%] w-[85%] flex items-center justify-center md:flex-row bg-[#0a3d4c] rounded-lg px-6 py-12 gap-10 " >

                {/* Left Side */}
                <div className="flex-1 text-white flex flex-col justify-center gap-8 max-w-sm">
                    <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                        Let's talk<br />
                        on something <span className="text-teal-400">great</span><br />
                        together
                    </h2>
                    <div className="flex flex-col gap-3 text-base font-medium">
                        <div className="flex items-center gap-2">
                            <FaEnvelope />
                            <span>ashokyadavrtp200@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaPhoneAlt />
                            <span>+14 123 456 789</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt />
                            <span>Gate no.2 minal Bhopal</span>
                        </div>
                    </div>
                    <div className="flex gap-6 mt-4 text-2xl">
                        <a href="#" className="hover:text-teal-400"><FaBehance /></a>
                        <a href="#" className="hover:text-teal-400"><FaDribbble /></a>
                        <a href="#" className="hover:text-teal-400"><FaInstagram /></a>
                    </div>
                </div>

                {/* Right Side Form */}
                <div className="flex-1 bg-white px-7 py-8 rounded-2xl shadow-xl max-w-lg">
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {TAGS.map(tag => (
                                <button
                                    key={tag}
                                    type="button"
                                    className={`px-4 py-1 rounded-full border ${tag === selectedTag ? "bg-teal-500 text-white border-teal-500" : "bg-gray-100 text-gray-600 border-gray-200"
                                        } transition`}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="border-b-2 border-gray-200 py-2 px-2 focus:outline-none focus:border-teal-400"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="area2nd@gmail.com"
                            required
                            className="border-b-2 border-gray-200 py-2 px-2 focus:outline-none focus:border-teal-400"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <textarea
                            name="message"
                            placeholder="Type your message here..."
                            rows={3}
                            className="border-b-2 border-gray-200 py-2 px-2 focus:outline-none focus:border-teal-400"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-teal-500 text-white font-semibold py-3 rounded-full mt-3 transition hover:scale-[0.9] hover:bg-[#0A3D4C]">
                            Send message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

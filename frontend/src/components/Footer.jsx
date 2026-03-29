import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className="h-70 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white pt-10 pb-3 font1">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* About Us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">About us</h3>
                        <p className="text-xs mb-4 ">
                            Users can sign up, build their professional profile, upload photos, cover images, and resumes. They can browse job listings, apply instantly, and track application status
                        </p>
                        <div className="flex gap-3 mt-2">
                            <a href="#" ><FaFacebookF size={20} /></a>
                            <a href="#"><FaLinkedinIn size={20} /></a>
                            <a href="#"><FaTwitter size={20} /></a>
                            <a href="#"><FaYoutube size={20} /></a>
                        </div>
                    </div>
                    {/* Useful Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-pink-400">About Us</a></li>
                            <li><a href="#" className="hover:text-pink-400">FAQs</a></li>
                            <li><a href="#" className="hover:text-pink-400">Privacy & Policy</a></li>
                            <li><a href="#" className="hover:text-pink-400">Team & Condition</a></li>
                            <li><a href="#" className="hover:text-pink-400">Contact Us</a></li>
                        </ul>
                    </div>
                    {/* Shop */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Job</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-pink-400 font-semibold">Full Time</a></li>
                            <li><a href="#" className="hover:text-pink-400"> Part Time</a></li>
                            <li><a href="#" className="hover:text-pink-400"> Remote</a></li>
                            <li><a href="#" className="hover:text-pink-400" >Work Form Home</a></li>
                        </ul>
                    </div>
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
                        <div className="flex items-center gap-2 mb-2 text-sm">
                            <FaMapMarkerAlt className="text-pink-400" />
                            <span>Gate no -2 Minal<br />Bhopal<br />EC2M 4QP</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-sm">
                            <FaPhoneAlt className="text-pink-400" />
                            <span>+1 234 567 7890</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <FaEnvelope className="text-pink-400" />
                            <span>ashokyadavrtp200@gmail.com</span>
                        </div>
                    </div>
                </div>
                {/* Copyright */}
                <div className="text-center text-xs mt-8 text-gray-300">
                    © 2025 Work_On | All rights reserved | Designed with ❤️ by Ashok Yadav.
                </div>
            </footer>
        </>
    )
}

export default Footer;

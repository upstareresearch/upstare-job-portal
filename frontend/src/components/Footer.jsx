import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram } from "react-icons/fa";

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
                            <a href="https://www.facebook.com/share/1G6cjTVHPX/" ><FaFacebookF size={20} /></a>
                            <a href="https://www.linkedin.com/company/upstareresearch/posts/?feedView=all"><FaLinkedinIn size={20} /></a>
                            <a href="https://x.com/upstareresearch"><FaTwitter size={20} /></a>
                            <a href="https://www.instagram.com/upstare_research?igsh=MXN6OWNsNWRrcXk3NA=="><FaInstagram size={20} /></a>
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
                            <span><br />Bhopal<br />Madhya Pradesh</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-sm">
                            <FaPhoneAlt className="text-pink-400" />
                            <span>+ 91-6268226160</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <FaEnvelope className="text-pink-400" />
                            <span>support@upstareresearch.com</span>
                        </div>
                    </div>
                </div>
                {/* Copyright */}
                <div className="text-center text-xs mt-8 text-gray-300">
                    © 2025 Upstare Research | All rights reserved | Designed with Upstare Research.
                </div>
            </footer>
        </>
    )
}

export default Footer;

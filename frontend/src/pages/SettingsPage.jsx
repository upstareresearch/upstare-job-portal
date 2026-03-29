import { useState } from "react";
import { toast } from "react-toastify";
import { Lock, KeyRound } from "lucide-react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { axiosInstance } from "../config/axiosinstance";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.put("/api/user/change-password", formData);
      toast.success(res.data.message || "Password changed successfully");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className=" w-full flex flex-col items-center justify-center  mt-12 p-8 bg-while ">
        <h2 className="text-2xl font-bold font7 text-[#0A3D4C]  mb-6 flex items-center gap-2 ">
          <Lock className="text-[#0A3D4C]" /> Account Settings
        </h2>

        <form onSubmit={handleSubmit} className=" w-[60%] mb-10 space-y-5  px-10 py-10 shadow-lg rounded-2xl ">
          {/* Current Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3D4C]"
              placeholder="Enter your current password"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3D4C]"
              placeholder="Enter your new password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A3D4C]"
              placeholder="Confirm your new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg transition-all ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0A3D4C] hover:bg-[#095060]"
              }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>
      <Contact />
      <Footer />
    </>
  );
};

export default SettingsPage;

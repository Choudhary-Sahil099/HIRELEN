import { useState } from "react";
import { X } from "lucide-react";

const EditProfileModal = ({ profile, onClose, onUpdate }: any) => {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);

      if (file) {
        formData.append("avatar", file);
      }

      await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      onUpdate();
      onClose();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-105 rounded-2xl shadow-2xl p-6 flex flex-col gap-6 relative animate-fadeIn">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Profile
          </h2>
          <p className="text-sm text-gray-500">
            Update your personal information
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : profile.avatar_url || "/default-avatar.png"
              }
              className="w-24 h-24 rounded-xl object-cover border"
            />

            <label className="absolute bottom-0 right-0 bg-teal-600 text-white text-xs px-2 py-1 rounded cursor-pointer">
              Change
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />
            </label>
          </div>

          <p className="text-xs text-gray-500">
            JPG, PNG up to 2MB
          </p>
        </div>
        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

        </div>
        <div className="flex justify-end gap-3 mt-2">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
};

export default EditProfileModal;
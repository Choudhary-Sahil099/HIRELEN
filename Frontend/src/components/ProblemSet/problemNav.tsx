import { Bell, Search, Settings } from "lucide-react";
const problemNav = ({ user, onRun, onSubmit }: any) => {
  return (
    <div className="sticky top-0 z-50 w-full bg-white flex justify-between items-center px-6 py-3 inter">
      <div className="flex gap-8 items-center justify-center">
        <h1 className="text-2xl font-bold text-teal-900">CodeSanctuary</h1>
        <div className="flex gap-6 font-semibold text-teal-900 text-lg">
          <h1>Problem</h1>
          <h1>Explore</h1>
          <h1>Discuss</h1>
          <h1>Submissions</h1>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-4">
          <div className="bg-gray-200 flex items-center px-4 py-1.5 rounded-xl gap-2">
            <Search size={18} stroke="gray" />
            <input
              className="w-39 outline-none"
              placeholder="Search problem..."
            />
          </div>

          <button className="bg-gray-300 rounded-lg text-sm px-3 font-semibold text-teal-900" onClick={onRun}>
            Run Code
          </button>

          <button className="bg-teal-900 text-white px-4 rounded-lg text-sm font-semibold" onClick={onSubmit}>
            Submit
          </button>
        </div>
        <div className="w-0.5 h-8 bg-gray-400"></div>

        <div className="flex gap-7 items-center">
          <Bell stroke="gray" fill="gray" />
          <Settings stroke="gray" />
          <img
            src={user?.avatar_url}
            alt="avatar"
            className="w-9 h-9 rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default problemNav;

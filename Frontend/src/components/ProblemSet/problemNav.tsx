import { Bell, Search, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const problemNav = ({
  user,
  onRun,
  onSubmit,
  activeSection,
  setActiveSection,
}: any) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/problems/search?q=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      setResults(data.data || []);
    };

    const delay = setTimeout(fetchResults, 300);

    return () => clearTimeout(delay);
  }, [query]);
  return (
    <div className="sticky top-0 z-50 w-full bg-white flex justify-between items-center px-6 py-3 inter">
      <div className="flex gap-8 items-center justify-center">
        <h1
          className="text-2xl font-bold text-teal-900 hover:cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          CodeSanctuary
        </h1>
        <div className="flex gap-6 font-semibold text-gray-500 text-lg">
          <h1
            onClick={() => setActiveSection("problem")}
            className={`cursor-pointer ${
              activeSection === "problem"
                ? "text-teal-600 border-b-2 border-teal-600"
                : ""
            }`}
          >
            Problem
          </h1>
          <h1>Explore</h1>
          <h1>Discuss</h1>
          <h1
            onClick={() => setActiveSection("submissions")}
            className={`cursor-pointer ${
              activeSection === "submissions"
                ? "text-teal-600 border-b-2 border-teal-600"
                : ""
            }`}
          >
            Submissions
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-4">
          <div className="relative bg-gray-200 flex items-center px-4 py-1.5 rounded-xl gap-2">
            <Search size={18} stroke="gray" />
            <input
              className="w-39 outline-none"
              placeholder="Search problem..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
              <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
                {results.map((p: any) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      navigate(`/problem/${p.id}`);
                      setQuery("");
                      setResults([]);
                    }}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-none"
                  >
                    <div className="font-semibold text-sm">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.difficulty}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="bg-gray-300 rounded-lg text-sm px-3 font-semibold text-teal-900 hover:cursor-pointer hover:scale-103 transition-all"
            onClick={onRun}
          >
            Run Code
          </button>

          <button
            className="bg-teal-900 text-white px-4 rounded-lg text-sm font-semibold hover:cursor-pointer hover:scale-103 transition-all"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
        <div className="w-0.5 h-8 bg-gray-400"></div>

        <div className="flex gap-7 items-center">
          <Bell
            stroke="gray"
            fill="gray"
            className="hover:cursor-pointer hover:scale-103"
          />
          <Settings
            stroke="gray"
            className="hover:cursor-pointer hover:scale-103"
          />
          <img
            src={user?.avatar_url}
            alt="avatar"
            className="w-9 h-9 rounded-xl object-cover hover:cursor-pointer hover:scale-103"
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default problemNav;

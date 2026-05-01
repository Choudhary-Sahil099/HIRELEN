import DifficultyFilter from "./DifficultyFilter";
import TopicsFilter from "./TopicsFilter";
import GlobalStats from "./GlobalStats";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FiltersSidebar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

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
    <div className="w-64 flex flex-col gap-5">
      {" "}
      <div className="relative flex items-center gap-3 bg-gray-200 rounded-md p-2 inter">
        {" "}
        <Search />
        <input
          className="w-full h-10 border-none bg-gray-200 outline-none"
          placeholder="Search for the problem"
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
      <DifficultyFilter />
      <TopicsFilter />
      <GlobalStats />
    </div>
  );
};

export default FiltersSidebar;

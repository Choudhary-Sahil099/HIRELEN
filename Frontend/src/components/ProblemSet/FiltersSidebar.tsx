import DifficultyFilter from "./DifficultyFilter";
import TopicsFilter from "./TopicsFilter";
import GlobalStats from "./GlobalStats";
import { Search } from "lucide-react";
const FiltersSidebar = () => {
  return (
    <div className="w-64 flex flex-col gap-5">
      <div className="flex justify-center items-center gap-3 bg-gray-200 rounded-md p-2 inter">
        <Search />
        <input className="w-full h-10 border-none bg-gray-200 outline-none" placeholder="Search for the problem"/>
      </div>
      <DifficultyFilter />
      <TopicsFilter />
      <GlobalStats />
    </div>
  );
};

export default FiltersSidebar;
const topics = [
  "Arrays",
  "Strings",
  "Trees",
  "Graphs",
  "DP",
  "Sorting",
  "Hash Table",
  "Binary Search",
];

const TopicsFilter = () => {
  return (
    <div className="bg-gray-100 p-7 rounded-xl">
      <p className="text-md font-bold text-[#043229] mb-3">TOPICS</p>

      <div className="flex flex-wrap gap-3">
        {topics.map((t, i) => (
          <span
            key={i}
            className="px-3 py-1 text-center bg-gray-300 text-[#166152] font-medium rounded-xl text-sm hover:bg-white hover:cursor-pointer"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopicsFilter;
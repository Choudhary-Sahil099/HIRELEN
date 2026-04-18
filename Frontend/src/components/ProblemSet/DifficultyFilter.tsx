const DifficultyFilter = () => {
  return (
    <div className="bg-gray-100 p-7 rounded-xl">
      <p className="text-md text-[#043229] font-semibold mb-3">
        DIFFICULTY
      </p>

      {["Easy", "Medium", "Hard"].map((level, i) => (
        <div key={i} className="flex justify-between mb-2 inter">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#0a6a57]"
            />
            <span>{level}</span>
          </label>

          <span className="text-sm text-gray-400">
            {[142, 312, 98][i]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DifficultyFilter;
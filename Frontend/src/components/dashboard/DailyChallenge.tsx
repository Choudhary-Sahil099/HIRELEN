const DailyChallenge = () => {
  return (
    <div className="bg-linear-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">
        Daily Challenge 🚀
      </h3>

      <p className="text-sm opacity-90 mb-4">
        Solve today's challenge to maintain your streak!
      </p>

      <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium">
        Solve Now
      </button>
    </div>
  );
};

export default DailyChallenge;
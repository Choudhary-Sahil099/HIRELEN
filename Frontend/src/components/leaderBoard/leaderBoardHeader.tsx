const LeaderboardHeader = () => (
  <div className="flex justify-between items-center">
    <div className="flex flex-col gap-3">
      <h1 className="text-5xl font-bold inter">The Grand Hall</h1>
      <p className="text-gray-500 text-sm font-semibold">
        Observing the intellectual velocity of our global fellowship.
      </p>
    </div>

    <div className="flex bg-gray-200 rounded-xl text-sm inter font-semibold p-2">
      <button className="px-3 py-1 rounded-lg bg-white shadow ">
        Global
      </button>
      <button className="px-3 py-1">Friends</button>
      <button className="px-3 py-1">Regional</button>
    </div>
  </div>
);
export default LeaderboardHeader;
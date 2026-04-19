const ChampionCard = () => (
  <div className="bg-teal-800 text-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-lg">
    <div className="relative">
      <img
        src="https://i.pravatar.cc/100?img=5"
        className="w-25 h-25 rounded-full border-4 border-white"
      />
    </div>

    <h2 className="text-lg font-semibold">Dr. Elena K.</h2>
    <p className="text-sm opacity-80">3,125 ELO</p>

    <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
      CURRENT CHAMPION
    </span>
  </div>
);
export default ChampionCard;
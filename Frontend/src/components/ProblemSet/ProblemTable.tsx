import ProblemRow from "./ProblemRow";

const ProblemTable = ({ problems }: any) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div
        className="grid grid-cols-[120px_1fr_140px_130px_160px] 
        text-[13px] font-semibold text-[#0a6a57] 
        bg-gray-200 h-14 
        border-b border-gray-100 px-4 inter"
      >
        <p className="flex items-center">STATUS</p>
        <p className="flex items-center">PROBLEM TITLE</p>
        <p className="flex items-center">DIFFICULTY</p>
        <p className="flex items-center">ACCEPTANCE</p>
        <p className="flex items-center">TAGS</p>
      </div>

      {problems.map((item: any) => (
        <ProblemRow key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ProblemTable;
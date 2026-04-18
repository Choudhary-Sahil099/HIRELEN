import ProblemRow from "./ProblemRow";
import type { ProblemRowProps } from "./ProblemRow";
const data: ProblemRowProps[] = [
  {
    title: "Redact Inverted Subtree",
    difficulty: "MEDIUM",
    acceptance: "42.8%",
    status: "attempted",
    tags:["Tree" , "DFS"],
  },
  {
    title: "Lexicographical Matrix Flow",
    difficulty: "HARD",
    acceptance: "18.4%",
    status: "none",
    tags:["DP", "Matrix"],

  },
  {
    title: "Valid Palindrome Partitioning",
    difficulty: "EASY",
    acceptance: "68.2%",
    status: "solved",
    tags:["String"],

  },
];

const ProblemTable = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="grid grid-cols-[120px_1fr_140px_130px_140px] 
                text-[13px] font-semibold text-[#0a6a57] 
                bg-gray-200 h-14 
                border-b border-gray-100 px-4 inter">

  <p className="flex items-center">STATUS</p>
  <p className="flex items-center">PROBLEM TITLE</p>
  <p className="flex items-center">DIFFICULTY</p>
  <p className="flex items-center">ACCEPTANCE</p>
  <p className="flex items-center">TAGS</p>

</div>

      {data.map((item, i) => (
        <ProblemRow key={i} {...item} />
      ))}
    </div>
  );
};

export default ProblemTable;
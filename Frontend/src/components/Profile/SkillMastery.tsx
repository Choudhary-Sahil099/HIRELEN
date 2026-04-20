import ProgressBar from "./ProgressBar";

const SkillsMastery = () => {
  const skills = [
    { label: "Data Structures", value: 98 },
    { label: "Algorithms", value: 94 },
    { label: "System Design", value: 89 },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 w-90 inter">
      <h2 className="text-lg font-semibold mb-4">Skills Mastery</h2>
      <div className="flex flex-col gap-5">
        {skills.map((skill, index) => (
          <ProgressBar
            key={index}
            label={skill.label}
            value={skill.value}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsMastery;
import ProblemDetail from "../../components/ProblemSet/problemDetail";
import { useState, useEffect } from "react";
import ProblemNav from "../../components/ProblemSet/problemNav";
import SubmissionHistory from "../../components/ProblemSet/SubmissionHistory";
const CodeEditor = () => {
  const [user, setUser] = useState(null);
  const [runTrigger, setRunTrigger] = useState(0);
  const [submitTrigger, setSubmitTrigger] = useState(0);
  const [activeSection, setActiveSection] = useState("problem");
  const handleRun = () => setRunTrigger((prev) => prev + 1);
  const handleSubmit = () => setSubmitTrigger((prev) => prev + 1);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        console.log("Error fetching user");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="overflow-y-auto">
      <ProblemNav
        user={user}
        onRun={handleRun}
        onSubmit={handleSubmit}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {activeSection === "problem" && (
        <ProblemDetail runTrigger={runTrigger} submitTrigger={submitTrigger} />
      )}

      {activeSection === "submissions" && <SubmissionHistory />}
    </div>
  );
};

export default CodeEditor;

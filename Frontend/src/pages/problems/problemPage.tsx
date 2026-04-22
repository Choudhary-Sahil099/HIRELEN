import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CircularProgress from "../../components/dashboard/Progress";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import FiltersSidebar from "../../components/ProblemSet/FiltersSidebar";
import ProblemTable from "../../components/ProblemSet/ProblemTable";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/problems", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProblems(data);
      } catch (err) {
        console.error("Error fetching problems", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);
  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-lg">Loading problems...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-7 p-2"
      >
        <motion.div
          variants={item}
          className="flex justify-between items-center mb-4"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold inter">
              The Problem Set
            </h1>
            <p className="text-lg text-gray-600">
              Refine your logic in our digital sanctuary. From fundamental data
              structures to
              <br />
              advanced architectural patterns, curate your learning journey with
              academic
              <br />
              precision.
            </p>
          </div>

          <motion.div
            variants={item}
            className="flex justify-end items-center gap-4"
          >
            <CircularProgress />
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          className="min-h-screen flex gap-6"
        >
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FiltersSidebar />
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col gap-6"
          >
            <ProblemTable problems={problems} />
          </motion.div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Problems;
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    // this is the basic side bar design according to the ui/ux design created
    // note that this is not the final design
    <div className="w-64 bg-black text-white p-5">
      <h2 className="text-xl font-bold mb-6">HireLens</h2>

      <nav className="space-y-3">
        <Link to="/dashboard" className="block hover:text-gray-400">
          Dashboard
        </Link>

        <Link to="/interview" className="block hover:text-gray-400">
          Interview Room
        </Link>

        <Link to="/reports" className="block hover:text-gray-400">
          Reports
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
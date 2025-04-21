import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="text-xl font-semibold">Aaccent Blogs</div>
        <div className="flex space-x-4">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <Link to="/publish">New</Link>
          </button>
          <Avatar name="Shaurya" size="big" />
        </div>
      </div>
    </div>
  );
};

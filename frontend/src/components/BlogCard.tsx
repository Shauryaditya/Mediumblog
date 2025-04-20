import { Link } from "react-router-dom";
import RenderHTML from "./RenderHTML";

interface BlogCardProps {
  authorName: string;
  id: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName = "Anonymous",
  id,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="p-6 border-b border-slate-200">
      <div className="flex space-x-2">
        <div className="flex justify-center">
          <Avatar name={authorName || "Anonymous"} size="small"/>
        </div>
        <div className="text-xs font-extralight pl-2">{authorName}</div>
        <div className="text-xs font-thin text-slate-500"> {publishedDate}</div>
      </div>
      <div className="text-xl font-semibold">{title}</div>
      <div><RenderHTML htmlContent={content.slice(0, 100) + "..."} /></div>
      <div className="text-xs font-thin text-slate-500">
        {`${Math.ceil(content.length / 100)} min read`}
      </div>
    </div>
    </Link>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}): JSX.Element {
  return (
    <div
      className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "big" ? "w-10 h-10" : "w-6 h-6"
      }`}
    >
      <span
        className={`text-gray-600 font-extralight  dark:text-gray-300 ${
          size === "small" ? "text-xs" : "text-base"
        }`}
      >
        {name[0]}
      </span>
    </div>
  );
}

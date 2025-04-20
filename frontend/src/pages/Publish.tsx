import { useRef, useState } from "react";
import ReactQuill from "react-quill";

import { Appbar } from "../components/Appbar";
import TextEditor from "../components/TextEditor";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const reactQuillRef = useRef<ReactQuill>(null);
  const handlePublish = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate(`/blog/${response.data.id}`);
  };
  return (
    <div className="">
      <Appbar />
      <div className="p-8">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Title
          </label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            required
          />
        </div>
        <TextEditor
          value={value}
          setValue={setValue}
          reactQuillRef={reactQuillRef}
        />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-8"
          onClick={handlePublish}
        >
          Publish Post
        </button>
      </div>
    </div>
  );
};

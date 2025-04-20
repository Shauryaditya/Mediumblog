import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Avatar } from "../components/BlogCard";
import RenderHTML from "../components/RenderHTML";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<{
    title: string;
    content: string;
    author: {
      name: string;
    };
    publishedDate: string;
  } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPost(response.data.blog);
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      {post ? (
        <>
          <div className="flex p-8 space-x-8">
            <div className="w-2/3">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <p><RenderHTML htmlContent={post.content} /></p>
              <p>Published on: {post.publishedDate}</p>
            </div>
            <div className="w-1/3 pb-3">
            <p className="text-lg font-semibold">Author</p>
              <div className="flex space-x-4">
                <Avatar size="big" name={post.author.name || "Anonymous"} />
                <div className="">
                
                  <p className="text-xl font-bold">
                    {post.author.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-slate-500">
                    Random catch phrase about author's ability to catch user's
                    attention
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

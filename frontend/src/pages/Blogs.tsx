import { useEffect } from "react";
import useFetchBlogs from "../hooks/useFetchBlogs";

import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import BlogSkeleton from "../components/BlogSkeleton";

interface Post {
  id: string;
  author: {
    name: string;
  };
  title: string;
  content: string;
  publishedDate: string;
}

export const Blogs = () => {
  const { posts, loading, error } = useFetchBlogs<Post[]>();

  if (loading) {
    return (
      <div className="">
        <Appbar />
        <div className="flex justify-center">
          <div className="">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
        ;
      </div>
    );
  }

  return (
    <div className="">
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-4xl">
          {posts.map((post: Post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              authorName={post.author.name || "Anonymous"}
              title={post.title}
              content={post.content}
              publishedDate={"2nd February"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

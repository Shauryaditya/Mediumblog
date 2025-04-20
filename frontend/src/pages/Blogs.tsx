
import useFetchBlogs from "../hooks/useFetchBlogs";

import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import BlogSkeleton from "../components/BlogSkeleton";



export const Blogs = () => {
  const { posts, loading } = useFetchBlogs();

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
          {posts.map((post) => (
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

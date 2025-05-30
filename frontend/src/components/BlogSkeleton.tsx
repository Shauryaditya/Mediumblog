const BlogSkeleton = () => {
  return (
    <div role="status" className="w-full animate-pulse">
      <div className="p-6 border-b border-slate-200">
        <div className="flex space-x-2">
          <div className="flex justify-center">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
          </div>
          <div className="text-xs font-extralight pl-2">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[760px] mb-2.5"></div>
          </div>
          <div className="text-xs font-thin text-slate-500">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          </div>
        </div>
        <div className="text-xl font-semibold">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[730px] mb-2.5"></div>
        </div>
        <div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[700px] mb-2.5"></div>
        </div>
        <div className="text-xs font-thin text-slate-500">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[760px]"></div>
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default BlogSkeleton;

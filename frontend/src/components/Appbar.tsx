import { Avatar } from "./BlogCard";

export const Appbar = () => {
    return (
        <div className="">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <div className="text-xl font-semibold">Aaccent Blogs</div>
                <div className="flex space-x-4">
                    <Avatar name="Shaurya" size="big"/>
                    
                </div>
            </div>
        </div>
    );
}
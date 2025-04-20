import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";



const useFetchBlogs = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the request headers
                    },
                });
                if (response.status !== 200) {
                    throw new Error("Failed to fetch posts");
                }
                const data = response.data;
                setPosts(data.posts);
            } catch (err) {
                setError((err as Error).message);

            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
};

export default useFetchBlogs;

interface Post {
    id: string;
    author: {
        name: string;
      };
    title: string;
    content: string;
    publishedDate: string;
}

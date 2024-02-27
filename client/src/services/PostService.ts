import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const authToken = (`${localStorage.getItem("accessToken")}`);
  const decodeduser = jwtDecode(authToken);

  interface JwtPayload {
    user: {
      id: string; 
    };
  }
  const user = (decodeduser as JwtPayload)['user']['id'];
  console.log(user)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/post/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = async (content: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/post/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({  user , content,}),
      });

      if (!response.ok) {
        throw new Error("Failed to add post");
      }

      fetchData();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePost = async (id: string, content: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/post/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      fetchData();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/post/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      fetchData();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return { posts, addPost, updatePost, deletePost };
};

export default usePosts;
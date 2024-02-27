import React, { useState } from "react";
import "./Home.css";
import usePosts from "../services/PostService";

const Home: React.FC = () => {
  const { posts, addPost, updatePost, deletePost } = usePosts();
  const [newPost, setNewPost] = useState("");

  const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = () => {
    if (newPost.trim() !== "") {
      addPost(newPost);
      setNewPost("");
    }
  };

  const handleDeletePost = (id: string) => {
    deletePost(id);
  };

  const handleUpdatePost = (id: string, content: string) => {
    updatePost(id, content);
  };

  return (
    <div className="home-container">
      <div className="post-form">
        <input
          type="text"
          placeholder="Enter your post..."
          value={newPost}
          onChange={handleNewPostChange}
        />
        <button onClick={handleAddPost}>Post</button>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div key={post['_id']} className="post">
            <div className="post-content">{post['content']}</div>

            {post['user'] && (
        <p>Posted by: {post['user']['username']}</p>
      )}
            <button onClick={() => handleUpdatePost(post['_id'], "Updated content")}>
              Update
            </button>
            <button onClick={() => handleDeletePost(post['_id'])}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import "./Home.css";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<string[]>([]);
  const [newPost, setNewPost] = useState("");

  const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost(e.target.value);
  };

  const handleAddPost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, newPost]);
      setNewPost("");
    }
  };

  const handleDeletePost = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
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
        {posts.map((post, index) => (
          <div key={index} className="post">
            <div className="post-content">{post}</div>
            <button onClick={() => handleDeletePost(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await axios.post(`${API_URL}/users/login`, loginData);

        if (response.data.status === 'success') {
            Swal.fire({
                title: "Log in successful",
                text: `Welcome: ${response.data.user.first_name} ${response.data.user.surname}`,
                icon: 'success',
                // Uncomment the line below if you want to customize the confirm button text
                // confirmButtonText: 'OK'
            });
        } else {
            // Handle the case where status is not 'success'
            Swal.fire({
                title: "Login failed",
                text: response.data.message || 'An unexpected error occurred.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Login error:", error);

        // Notify the user of the error
        Swal.fire({
            title: "Login error",
            text: 'An unexpected error occurred. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        setIsLoading(false);
    }
};


import React, { useState } from 'react';

const App = () => {
  // State for the list of posts
  const [posts, setPosts] = useState([]);
  
  // State for the new post input
  const [newPost, setNewPost] = useState('');

  // Handler to update newPost state
  const handleInputChange = (e) => {
    setNewPost(e.target.value);
  };

  // Handler to add a new post
  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([...posts, newPost]);
      setNewPost(''); // Clear the input after adding
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      
      {/* Input field for new post */}
      <input 
        type="text" 
        value={newPost} 
        onChange={handleInputChange} 
        placeholder="Enter a new post" 
      />
      
      {/* Button to add the new post */}
      <button onClick={handleAddPost}>Add Post</button>
      
      {/* Display the list of posts */}
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

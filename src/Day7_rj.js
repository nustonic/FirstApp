import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Day7 = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loginData, setLoginData] = useState({
    email: "olay1@gmail.com",
    password: "12345",
  });
  const [signupData, setSignupData] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, loginData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        fetchPosts(token);
        Swal.fire({
          icon: "success",
          title: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
          text: `ຍິນດີຕ້ອນຮັບທ່ານ ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ເຂົ້າສູ່ລະບົບລົ້ມເຫຼວ",
        text: "ກະລຸນາກວດສອບຂ້ໍມູນຂອງທ່ານແລ້ວລອງໃຫມ່ອີກຄັ້ງ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/signup`, signupData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        fetchPosts(token);
        Swal.fire({
          icon: "success",
          title: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
          text: `ຍິນດີຕ້ອນຮັບທ່ານ ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ເຂົ້າສູ່ລະບົບລົ້ມເຫຼວ",
        text: "ກະລຸນາກວດສອບຂ້ໍມູນຂອງທ່ານແລ້ວລອງໃຫມ່ອີກຄັ້ງ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async (token) => {
    if (!token) {
      setPosts([]);
      return;
    }
    setIsPostsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data.data.posts);
    } catch (error) {
      setPosts([]);
    } finally {
      setIsPostsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPosts([]);
    Swal.fire({
      icon: "success",
      title: "ອອກຈາກລະບົບສຳເລັດ",
      text: "ຂອບໃຈທີ່ໃຊ້ບໍລິການ!",
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Please login first!",
        text: "Please login to perform this action!",
      });
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${API_URL}/posts`,
        { content: newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewPost('');
      fetchPosts(token)
      Swal.fire({
        icon: "success",
        title: "Create a new post successfully!",
        text: "You have already posted!"
      })
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Cannot create a new post!",
            text: "Something went wrong, please try again later!"
          })
    } finally {
        setIsLoading(false)
    }
  };

  return (
    <div className="container">
      <h1>ມື້ທີ7: ລະບົບ login ແລະ Post</h1>

      {isLoading && <div className="loading">ກຳລັງໂຫລດ...</div>}

      {!user ? (
        <div>
          <div className="tabs">
            <button
              className={activeTab === "login" ? "active" : ""}
              onClick={() => setActiveTab("login")}
            >
              ເຂົ້າສູ່ລະບົບ
            </button>
            <button
              className={activeTab === "signup" ? "active" : ""}
              onClick={() => setActiveTab("signup")}
            >
              ລົງທະບຽນ
            </button>
          </div>
          {activeTab === "login" && (
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              ></input>
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              ></input>
              <button type="submit" disabled={isLoading}>
                ເຂົ້າສູ່ລະບົບ
              </button>
            </form>
          )}
          {activeTab === "signup" && (
            <div>
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="First name"
                  value={signupData.first_name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, first_name: e.target.value })
                  }
                ></input>
                <input
                  type="text"
                  placeholder="Surname"
                  value={signupData.surname}
                  onChange={(e) =>
                    setSignupData({ ...signupData, surname: e.target.value })
                  }
                ></input>
                <input
                  type="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                ></input>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={signupData.phone_number}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      phone_number: e.target.value,
                    })
                  }
                ></input>
                <input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                ></input>
                <button type="submit" disabled={isLoading}>
                  ລົງທະບຽນ
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>ສະບາຍດີ, {user.first_name}!</h2>
          <p>Email: {user.email}</p>
          <p>ເບີໂທ: {user.phone_number}</p>
          <p>ສິດທິ: {user.role}</p>
          <button onClick={handleLogout}>ອອກຈາກລະບົບ</button>

          <h2>ໂພສ</h2>
          {isPostsLoading ? (
            <div className="loading">ກຳລັງໂຫລດໂພສ...</div>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post._id}>
                  <p>ຜູ້ຂຽນ: {post.author.first_name}</p>
                  <p>{post.content}</p>
                  <p>ໄລ້: {post.likes ? post.likes.length : 0}</p>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handlePostSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="ສ້າງໂພສໃຫມ່"
            ></textarea>
            <button type="submit" disabled={isLoading}>
              ສ້າງໂພສ
            </button>
          </form>
        </div>
      )}
      <style jsx>
        {`
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .tabs {
            display: flex;
            margin-bottom: 20px;
          }
          .tabs button {
            flex: 1;
            padding: 10px;
            border: none;
            background-color: #f1f1f1;
            cursor: pointer;
          }
          .tabs button.active {
            background-color: #4caf50;
            color: white;
          }
          form {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
          }
          input,
          textarea {
            margin-bottom: 10px;
            padding: 5px;
          }
          button {
            padding: 10px;
            background-color: #4caf50;
            color: white;
            border: none;
            cursor: pointer;
          }
          button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            background-color: #f1f1f1;
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 5px;
          }
          .loading {
            text-align: center;
            padding: 20px;
            font-style: italic;
            color: #666;
          }
        `}
      </style>
    </div>
  );
};

export default Day7;

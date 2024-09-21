import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Day8 = () => {
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
        fetchPosts();
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
        fetchPosts();
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

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
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
      setNewPost("");
      fetchPosts();
      Swal.fire({
        icon: "success",
        title: "Create a new post successfully!",
        text: "You have already posted!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Cannot create a new post!",
        text: "Something went wrong, please try again later!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (isoString) => {
    // ສ້າງ Date object ຈາກ ISO String
    const date = new Date(isoString);
    // ປັບເວລາເປັນ UTC + 7
    date.setHours(date.getHours() + 7);
    // ຟັງຊັ່ນຊ່ວຍເຕີມເລກ 0 ໃສ່ທາງໜ້າ
    const padZero = (num) => num.toString().padStart(2, "0");
    // ດຶງຂໍ້ມູນວັນທີ
    const day = padZero(date.getUTCDate());
    const month = padZero(date.getUTCMonth() + 1); // ເລີ່ມຈາກ 0
    const year = padZero(date.getUTCFullYear());
    // ດຶງຂ້ໍມູນເວລາ
    let hours = date.getUTCHours();
    const minutes = padZero(date.getUTCMinutes());
    const ampm = hours >= 12 ? "PM" : "AM";
    // ປັບຊົ່ວໂມງເປັນຮູບແບບ 12 ຊມ
    hours = hours % 12;
    hours = hours ? hours : 12; // ຖ້າຊົ່ວໂມງເປັນ 0, ປ່ຽນເປັນ 12
    hours = padZero(hours);
    // ສ້າງ String ເປັນຜົນລັບ
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ",
        icon: "warning",
        text: "ກະລຸນາເຂົ້າສູ່ລະບົບເພື່ອລຶບໂພສ!",
      });
      return;
    }

    const result = await Swal.fire({
      title: "ທ່ານແນ່ໃຈບໍ?",
      text: "ທ່ານຈະບໍ່ສາມາດກູ້ຄືນໂພສນີ້ໄດ້!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ແມ່ນ, ລຶບມັນ!",
      cancelButtonText: "ຍົກເລີກ",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("ລຶບແລ້ວ!", "ໂພສຂອງທ່ານຖືກລຶບແລ້ວ.", "success");
        fetchPosts();
      } catch (error) {
        Swal.fire(
          "ຜິດພາດ!",
          error?.response?.data?.message ??
            "ບໍ່ສາມາດລຶບໂພສໄດ້. ກະລຸນາລອງໃຫມ່ອີກຄັ້ງ.",
          "error"
        );
      }
    }
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ",
        icon: "warning",
        text: "ກະລຸນາເຂົ້າສູ່ລະບົບເພື່ອລຶບໂພສ!",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "success") {
        fetchPosts();
        Swal.fire({
          icon: "success",
          title: "ກົດໄລ້ສຳເລັດ",
          text: "ທ່ານໄດ້ກົດໄລ້ໂພສນີ້ແລ້ວ",
          timer: 1500,
          showCancelButton: false,
        });
      }
    } catch (error) {
      Swal.fire(
        "ຜິດພາດ!",
        error?.response?.data?.message ??
          "ບໍ່ສາມາດກົດໄລ້ໄດ້. ກະລຸນາລອງໃຫມ່ອີກຄັ້ງ.",
        "error"
      );
    }
  };

  return (
    <div className="container">
      <h1>ມື້ທີ8: ລະບົບ login ແລະ Post, CRUD ແລະ Router</h1>

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
          <button
            onClick={() => {
              fetchPosts();
            }}
          >
            Refresh posts
          </button>
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
          {isPostsLoading ? (
            <div className="loading">ກຳລັງໂຫລດໂພສ...</div>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post._id}>
                  <button
                    onClick={() => {
                      handleDelete(post._id);
                    }}
                  >
                    ລຶບ
                  </button>
                  <p>ເວລາ: {formatDateTime(post.createdAt)}</p>
                  <p>ຜູ້ຂຽນ: {post.author.first_name}</p>
                  <p>{post.content}</p>
                  <p>ໄລ້: {post.likes ? post.likes.length : 0}</p>
                  <button
                    onClick={() => {
                      handleLike(post._id);
                    }}
                  >
                    ກົດໄລ້
                  </button>
                  <Link to={`/edit/${post._id}`}>ແກ້ໄຂ</Link>
                </li>
              ))}
            </ul>
          )}
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

export default Day8;

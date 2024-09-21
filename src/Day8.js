import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Day8 = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [loginData, setLoginData] = useState({
        email: "nust@gmail.com",
        password: "8989",
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
    const navigate = useNavigate();
    useEffect(() => {
        fetchPosts()
        fecthMyUser();
    }, []
    )
    const fecthMyUser = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`${API_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } })
            setUser(res.data.data.data)
        } catch (error) {
            localStorage.removeItem('token')
        }
    }

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
        const token = localStorage.getItem('token')
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

    const handleLogout = async () => {
        const result =
            await Swal.fire({
                text: "Are You Sure!",
                title: 'logout?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Say Yes!!, Logout',
                cancelButtonText: 'Cancle',
            });
        if (result.isConfirmed) {
            localStorage.removeItem('token');
            await Swal.fire({
                icon: "success",
                title: "ອອກຈາກລະບົບສຳເລັດ",
                text: "ຂອບໃຈທີ່ໃຊ້ບໍລິການ!",
                timer: 1500,

            })
            navigate('/auth');
        }

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
            fetchPosts()
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
    const formatDateTime = (isoString) => {
        //create date obj from ISO String
        const date = new Date(isoString)
        date.setHours(date.getHours() + 7);
        //func add 0 to infront
        const padZero = (num) => num.toString().padStart(2, '0');
        //fetch Date data
        const day = padZero(date.getUTCDate());
        const month = padZero(date.getUTCMonth() + 1);
        const year = padZero(date.getUTCFullYear());
        //fecth Time data
        let hours = date.getUTCHours();
        const minutes = padZero(date.getUTCMinutes());
        const ampm = hours >= 12 ? 'PM' : 'AM';
        //set hours to 12h
        hours = hours % 12;
        hours = hours ? hours : 12 //if hours equl 0 then set to 12
        hours = padZero(hours)
        //creaTE string as result
        return `${day}-${month}-${year} ${hours}: ${minutes} ${ampm}`
    }

    const handleLike = async (postId) => {

        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                title: 'log in first',
                icon: 'warning',
                text: 'Please log in to delete'
            })
            return;
        }
        try {
            const res = await axios.post(
                `${API_URL}/posts/${postId}/like`, {}, { headers: { Authorization: `Bearer ${token}`, } }
            )
            if (res.data.status === 'success') {
                fetchPosts();
                Swal.fire({
                    title: 'Like successful',
                    icon: 'success',
                    text: 'you Liked this Post',
                    timer: 1500,
                    showCancelButton: false
                })
            }
        } catch (error) {
            Swal.fire('Failed', error?.response?.data?.message ?? "Can't like this post, try again", 'error')
        }


    }
    const handleDelete = async (postId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                title: 'log in first',
                icon: 'warning',
                text: 'Please log in to Like'
            })
            return;
        }
        const result = await
            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                text: 'You will not restore this Post',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Say Yes!!, Delete',
                cancelButtonText: 'Cancle',

            })
        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/posts/${postId}`, { headers: { Authorization: `Bearer ${token}` }, });
                Swal.fire('Deleted', 'Your post has deleted', 'success');
                fetchPosts();
            } catch (error) {
                Swal.fire('Failed', error?.response?.data?.message ?? "Can't delete post", 'error')
            }
        }
    }
    return (
        <div className="container">
            <h1>ມື້ທີ 8: ລະບົບ login ແລະ Post CRUD and Router</h1>

            {isLoading && <div className="loading">ກຳລັງໂຫລດ...</div>}

            <div className="user-info">
                <h2>ສະບາຍດີ, {user?.first_name}!</h2>
                <p>Email: {user?.email}</p>
                <p>ເບີໂທ: {user?.phone_number}</p>
                <p>ສິດທິ: {user?.role}</p>
                <button onClick={handleLogout}>ອອກຈາກລະບົບ</button>

                <h2>ໂພສ</h2>
                <button onClick={() => { fetchPosts(); }}>Refresh Posts</button>
                <hr></hr>
                <form onSubmit={handlePostSubmit}>
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="ສ້າງໂພສໃຫມ່"
                    ></textarea>
                    <button id='postsubmit' type="submit" disabled={isLoading}>
                        ສ້າງໂພສ
                    </button>
                </form>
                {isPostsLoading ? (
                    <div className="loading">ກຳລັງໂຫລດໂພສ...</div>
                ) : (
                    <ul id='showpost'>
                        {posts.map((post) => (
                            <li key={post._id} id='showpost-li'>
                                <button onClick={() => { handleDelete(post._id) }}>Delete</button>
                                <p>Created at: {formatDateTime(post.createdAt)}</p>
                                <p>ຜູ້ຂຽນ: {post.author.first_name}</p>
                                <p>{post.content}</p>
                                <p>ໄລ້: {post.likes ? post.likes.length : 0}</p>
                                <button
                                    className="btn-like"
                                    onClick={() => { handleLike(post._id) }}>
                                    <img id="like" width={50} height={50} alt='' src="https://th.bing.com/th/id/OIP.6_2UnvFWUc8m5eZDBue2KgHaHa?rs=1&pid=ImgDetMain"></img>
                                    <p id="pred"></p>LIKE</button>

                                <Link to={`/edit/${post._id}`}>Edit</Link>
                            </li>
                        ))}
                    </ul>
                )}


            </div>
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
            textarea {
            font-family: Phetsarath OT;
            font-weight:bold;
            color: #0398fc;
            padding: 10px;
            background-color:#fae6e6;
            }
            #postsubmit {
            background-color:#0398fc;
            }
        .user-info {
            border-raduis: 20px;
            padding: 15px;
            margin-bottom:15px;
            box-shadow: 0 0 5px rgba(0,0,0,0.5);
            background-image: url("https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg");
         }
        #showpost-li {
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        background-color:#f9fae6;
        }
         .btn-like{
         padding:0px;
        
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color: 0.3s;
         display: flex;
          background-color: white;
          border: 3px solid #0E5CD1;
          }
        `}
            </style>
        </div>
    );
};

export default Day8;

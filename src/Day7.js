import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Day7 = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loginData, setLoginData] = useState({
        email: 'nust@gmail.com',
        password: '8989',
    })
    const [signupData, setSignupData] = useState({
        first_name: '',
        surname: '',
        email: '',
        phone_number: '',
        password: '',
    })
    const [activeTab, setActiveTab] = useState('login');
    const [isLoading, setIsLoading] = useState(false);
    const [isPostsLoading, setIsPostsLoading] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/login`, loginData);
            if (response.data.status === 'success') {
                const token = response.data.token;
                localStorage.setItem('token', token);
                setUser(response.data.data.user);
                fetchPosts(token)
                Swal.fire({
                    title: "Log in successful",
                    text: `Welcome Boss: ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
                    icon: 'success',
                    // confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Login error",
                text: 'Login failed. Please try again later.',
                icon: 'error',

            });
        } finally {
            setIsLoading(false);
        }
    }



    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/signup`, signupData);
            if (response.data.status === 'success') {
                const token = response.data.token;
                localStorage.setItem('token', token);
                setUser(response.data.data.user);
                fetchPosts(token)
                Swal.fire({
                    title: "Sign up successful",
                    text: `Welcome Boss: ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
                    icon: 'success',
                    // confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Signup error",
                text: 'Signup failed. Please try again later.',
                icon: 'error',

            });
        } finally {
            setIsLoading(false);
        }
    }


    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'please login fist',
                text: 'please login'
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
                icon: 'success',
                title: 'create new post login fist',
                text: 'finish new post'
            });
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: 'error new post'
            })

        } finally {
            setIsLoading(false)
        }
    }



    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setPosts([]);
        Swal.fire({
            icon: 'success',
            title: 'Logout successful',
            text: 'Thank Q for USe'
        })
    }

    const fetchPosts = async (token) => {

        if (!token) {
            setPosts([])
            return;

        }
        setIsPostsLoading(true);

        try {
            const res = await axios.get(`${API_URL}/posts`, { headers: { Authorization: `Bearer ${token}` }, });
            setPosts(res.data.data.posts);

        } catch (error) {
            setPosts([]);
        } finally {
            setIsPostsLoading(false);
        }
    }

    return (
        <div className="container">
            <h1>
                Day 7: Login and Post System
            </h1>
            {isLoading && <div className="loading"> Loading...</div>}
            {!user ? (<div>
                <div className='tabs'>
                    <button className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>Login</button>
                    <button className={activeTab === 'signup' ? 'active' : ''} onClick={() => setActiveTab('signup')}>Signup</button>
                </div>
                {activeTab === 'login' && (
                    <form onSubmit={handleLogin}>

                        <input type="email" placeholder="Email" value={loginData.email} onChange={(e) =>
                            setLoginData({ ...loginData, email: e.target.value })
                        }></input>
                        <input type="password" placeholder="Password" value={loginData.password} onChange={(e) =>
                            setLoginData({ ...loginData, password: e.target.value })
                        }></input>
                        <button type="submit" disabled={isLoading}>Login</button>
                    </form>
                )}
                {activeTab === 'signup' && (<div>
                    <form onSubmit={handleSignup}>
                        <input type='text' placeholder='First name' value={signupData.first_name} onChange={(e) => setSignupData({ ...signupData, first_name: e.target.value })}></input>
                        <input type='text' placeholder='Surename' value={signupData.surname} onChange={(e) => setSignupData({ ...signupData, surname: e.target.value })}></input>
                        <input type='email' placeholder='Email' value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}></input>
                        <input type='tel' placeholder='Phone Number' value={signupData.phone_number} onChange={(e) => setSignupData({ ...signupData, phone_number: e.target.value })}></input>
                        <input type='password' placeholder='password' value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}></input>
                        <button type="submit" disabled={isLoading}>Register For Free</button>
                    </form>
                </div>)}
            </div>) : (<div>
                <button onClick={handleLogout}>Log Out</button>
                <h2>Sa Baiy Dee, {user.first_name} !!!</h2>

                <p>Email: {user.email}</p>
                <p>Contact: {user.phone_number}</p>
                <p>Role: {user.role}</p>

                <h2>Posts</h2>
                {isPostsLoading ? (<div className='loading'>Now loading...</div>) : (<ul>
                    {posts.map((post) => (
                        <li key={post._id}>
                            <p>Writer: {post.author.first_name}</p>
                            <p>{post.content}</p>
                            <p>Like: {post.likes ? post.likes.length : 0}</p>
                        </li>
                    ))}
                </ul>)

                }

                <form onSubmit={handlePostSubmit}>
                    <textarea
                        type="text"
                        value={newPost}
                        onChange={(e) => 
                            setNewPost(e.target.value)}
                        placeholder="Enter a new post"
                    />
                    <button type='submit' disabled={isLoading} onClick={handlePostSubmit}>Add Post</button>
                </form>

            </div>)}

            <style jsx>{`
           .container {
                max-width: 800px;
                margin: 0 auto;
                padding:20px;
            }  
           .tabs {
                display:flex;
                margin-bottom:20px;
            }
            .tabs button {
                flex:1;
                padding:10px;
                border: none;
                background-color:#f1f1f1;
               cursor: pointer;
            }
               .tabs button.active {
               background-color:#4CAF50;
               color: white;

               }
            form {
               display: flex;
               flex-direction: column;
               margin-bottom: 20px;
               }
            input, textarea{
               margin-bottom: 10px;
               padding: 5px;
               }
            button { 
                padding:10px;
                background-color:#4CAF50;
                color:white;
                border:none;
                cursor:pointer;

            }
            button: disabled {
                background-color:#cccccc;
                cursor: not-allowed;
            }
            ul {
                list-style-type:none;
                padding:0;

            }
            li {
                background-color:#f1f1f1;
                margin-bottom: 10px;
                padding:10px;
                border-radius: 5px;
            }
            .loading {
                Text-align: center;
                padding:20px;
                font-style:italic;
                color: #666;
            }
           `}
            </style>
        </div>
    )
}
export default Day7;
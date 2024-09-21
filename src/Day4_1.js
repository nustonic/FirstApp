import { useState } from "react";


const LoginForm = ({onSubmit}) => {
    const [formData, setFormData] = useState({

        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {

        e.preventDefault()
        if (formData.username === "admin"
            && formData.password === "123") {
                onSubmit(formData);
                setError("");
        } else{ setError("UserName or password not invalid")}
           
    }
const handleChange = (e) => {




    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const [profileImage, setProfileImage] = useState(null);
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);

        };
        reader.readAsDataURL(file);
    }}
    return (
        <div>
            <h2>Login Form</h2>
            <form className="form" onSubmit={handleSubmit}>
                {profileImage && (
                    <img className="profile-img" src={profileImage} alt="profile"></img>
                )}
                <div className="input-group">
                    <label>Profile image:</label>
                    <input onChange={handleImageUpload} type="file" id="profile-img" accept="image/*"></input>
                </div>
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" onChange={handleChange} id="username" name="username"></input>
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" onChange={handleChange} id="password" name="password"></input>

                </div>
                {error && <p className="error">{error}</p>}
                <button className="login-btn">Login</button>
            </form>
        </div>
    );
}
const SignUpForm = () => {
    const [profileImage, setProfileImage] = useState(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);

            };
            reader.readAsDataURL(file);
        }

    };
    return (
        <div>
            <h2>Register Form</h2>
            <form className="form">
                {profileImage && (
                    <img className="profile-img" src={profileImage} alt="profile"></img>
                )}
                <div className="input-group">
                    <label>Profile image:</label>
                    <input onChange={handleImageUpload} type="file" id="profile-img" accept="image/*"></input>
                </div>
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" id="username" name="username"></input>
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input type="email" id="email" name="email"></input>
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" id="password" name="password"></input>

                </div>
                
                <button className="login-btn">Sign Up</button>
            </form>
        </div>
    )
}
const Day4 = () => {
    const [isDarkmode, setIsDarkmode] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData]=useState(null);
    const handleLogin=(data)=>{
        setIsLoggedIn(true);
        setUserData(data);
    };
    const toggleDarkMode = () => {
        setIsDarkmode(!isDarkmode);
    }
    return (

        <div className={`container ${isDarkmode ? "dark-mode" : ""}`}>
            <div className="auth-tabs">

                <button type="button" className={isLoginForm ? "active" : ""} onClick={() => setIsLoginForm(true)}>Login</button>
                <button type="button" className={!isLoginForm ? "active" : ""} onClick={() => setIsLoginForm(false)}>register</button>
            </div>
            <button onClick={toggleDarkMode} className="toggle-btn">
                {isDarkmode ? " Normal " : " Dark "}Mode
            </button>
            <p>{isLoggedIn}</p>
            {isLoggedIn ?(
                <h2>welcome, {userData.username}</h2>
            ): }
            {isLoginForm ? <LoginForm onSubmit={handleLogin}/> : <SignUpForm />}
            <style jsx>
                {`
            .container {
                display: flex;
                flex-direction:column;
                align-items: center;
                min-height: 100vh;
                background-color:#f0f0f0;
                padding: 20px;
                max-width:600px;
                text-align: center
                margin: 0 auto;
            }
            
            .form {
            display:flex;
             flex-direction:column;
             width: 300px;
             padding: 20px;
             background-color:white;
             border-radius:8px;
             box-shadow: 0 0 10px rgba(0,0,0,0.1);
             margin-bottom: 20px;

            }
             .form input {
             margin: 10px 0;
             padding: 10px;
              border-radius:4px;
              border: 1px solid #ddd;
              font-size: 16px;
             }
              .form button,
              .logged-in button, 
              .toggle-button, 
              .auth-tabs button {
              margin: 10px 0;
              padding: 10px
                background-color: #4caf50;
               color: white;
               border: none;
               border-radius:4px;
               font-size: 16px;
               cursor: pointer;
             }
                .login-btn{
                background-color: #4caf50;
                }
                .input-group{
                display:flex;
                flex-direction:column;
                margin-bottom: 10px;
                }
                .profile-img     {
                width:100px;
                height:100px;
                border-radius:50%;
                object-fit: cover;
                margin: 0 auto 15px;
                border: 4px solid #c27455;
                }
                .dark-mode {
                background-color:#333;
                color: white;
                
                }
                .toggle-button{
                margin-bottom: 20px;

                }
                .dark-mode .form input{
                background-color:#555;
                color: white;
                border-color:#666;
        
                }
                .dark-mode .form {
                background-color:#444;
                color: white;
                }
                .auth-tabs {
                display: flex;
                justify-content:center;
                margin-buttom:20px;
                }
                .auth-tabs button{
                 background-color:#ddd;
                color: white;
                border:none;
                padding 10px 20px;
                margin 2px 5px;
                cursor: pointer;
                border-radius:4px;

                } 
                .auth-tabs button.active{
                 background-color:#4762b3;
                color: white;
                }
                .error {
                color:red;
                margin-bottom:10px;

                }



            `}
            </style>
        </div>
    );
}
export default Day4;
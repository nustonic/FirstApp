import { useState } from "react";

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.username === "admin" && formData.password === "password") {
      onSubmit(formData);
      setError("");
    } else {
      setError("ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
    }
  };

  return (
    <div>
      <h2>ຟອມເຂົ້າສູ່ລະບົບ</h2>
      <form className="form" onSubmit={handleSubmit}>
        {profileImage && (
          <img className="profile-image" src={profileImage} alt="Profile"></img>
        )}
        <div className="input-group">
          <label>ຮູບໂປຟາຍ:</label>
          <input
            onChange={handleImageUpload}
            type="file"
            id="profile-image"
            accept="image/*"
          ></input>
        </div>
        <div className="input-group">
          <label>ຊື່ຜູ້ໃຊ້:</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="input-group">
          <label>ລະຫັດຜ່ານ:</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          ></input>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">ເຂົ້າສູ່ລະບົບ</button>
      </form>
    </div>
  );
};

const SignUpForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>ຟອມສະໝັກບັນຊີ</h2>
      <form className="form" onSubmit={handleSubmit}>
        {profileImage && (
          <img className="profile-image" src={profileImage} alt="Profile"></img>
        )}
        <div className="input-group">
          <label>ຮູບໂປຟາຍ:</label>
          <input
            onChange={handleImageUpload}
            type="file"
            id="profile-image"
            accept="image/*"
          ></input>
        </div>
        <div className="input-group">
          <label>ຊື່ຜູ້ໃຊ້:</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="input-group">
          <label>ອີເມວ:</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="input-group">
          <label>ລະຫັດຜ່ານ:</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <button type="submit">ສະໝັກບັນຊີ</button>
      </form>
    </div>
  );
};

const Day4 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
  };

  const handleSignUp = (data) => {
    console.log("ສະໝັກບັນຊີສຳເລັດ:", data);
    setIsLoginForm(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <div className={`container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="auth-tabs">
        <button 
          type="button" 
          className={isLoginForm ? "active" : ""}
          onClick={() => setIsLoginForm(true)}
        >
          ເຂົ້າສູ່ລະບົບ
        </button>
        <button 
          type="button" 
          className={!isLoginForm ? "active" : ""}
          onClick={() => setIsLoginForm(false)}
        >
          ສະໝັກບັນຊີ
        </button>
      </div>
      <button onClick={toggleDarkMode} className="toggle-button">
        {isDarkMode ? "ໂໝດປົກກະຕິ" : "ໂໝດກາງຄືນ"}
      </button>
      {isLoggedIn ? (
        <div className="logged-in">
          <h2>ຍິນດີຕ້ອນຮັບ, {userData.username}!</h2>
          <button onClick={handleLogout}>ອອກຈາກລະບົບ</button>
        </div>
      ) : (
        isLoginForm ? <LoginForm onSubmit={handleLogin} /> : <SignUpForm onSubmit={handleSignUp} />
      )}
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0;
            padding: 20px;
            max-width: 600px;
            text-align: center;
            margin: 0 auto;
          }
          .dark-mode {
            background-color: #333;
            color: white;
          }
          .form {
            display: flex;
            flex-direction: column;
            width: 300px;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }
          .form input {
            margin: 10px 0;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
            font-size: 16px;
          }
          .form button,
          .logged-in button,
          .toggle-button,
          .auth-tabs button {
            margin: 10px 0;
            padding: 10px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
          }
          .input-group {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
          }
          .profile-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 15px;
          }
          .toggle-button {
            margin-bottom: 20px;
          }
          .dark-mode .form {
            background-color: #444;
            color: white;
          }
          .dark-mode .form input {
            background-color: #555;
            color: white;
            border-color: #666;
          }
          .auth-tabs {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          .auth-tabs button {
            background-color: #ddd;
            color: black;
            border: none;
            padding: 10px 20px;
            margin: 0 5px;
            cursor: pointer;
            border-radius: 4px;
          }
          .auth-tabs button.active {
            background-color: #4caf50;
            color: white;
          }
          .error {
            color: red;
            margin-bottom: 10px;
          }
          .logged-in {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .dark-mode .logged-in {
            background-color: #444;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default Day4;
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Authentication = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("login");
    const [isLoading, setIsLoading] = useState(false);
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



    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/login`, loginData);
            if (response.data.status === "success") {
                const token = response.data.token;
                localStorage.setItem("token", token);
                setUser(response.data.data.user);

                await Swal.fire({
                    icon: "success",
                    title: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
                    text: `ຍິນດີຕ້ອນຮັບທ່ານ ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
                    timer:1500,
                });

                navigate('/');
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

             await Swal.fire({
                    icon: "success",
                    title: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
                    text: `ຍິນດີຕ້ອນຮັບທ່ານ ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
                    timer:1500,
                });
                navigate('/');
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

    return (
        <div className="container">
            <div className="login-img">
                <img height={100} width={100} src="https://media.istockphoto.com/id/1299615596/vector/futuristic-golden-bitcoin-digital-currency-computer-circuit-board-cryptocurrency-mining-sci.jpg?s=612x612&w=0&k=20&c=fWGGI_UvdtMa-AtSbhP5CtYzzNwnGydJzr0bx47kxDU="></img>
            </div>
            <h2>ATM Cryptos System</h2>
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
            <style jsx>
                {`
          .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            background-color:#000;
            border-radius:10px;
            text-align:center;
            color:  white;
           
          
          }
       
            .login-img img{
             border-radius: 50%;
            margin-bottom: 15px;
            border: solid 5px white;
            item-align: center;
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
            background-color: #20b7e6;
            color: white;
            border: none;
            cursor: pointer;
              font-family: Phetsarath OT;
            font-size: 14px;
            border-radius:10px;
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

    )
}
export default Authentication;
 
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";
const CRYPTO_API = "https://api.coingecko.com/api/v3/coins/markets";
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="carousel">

            <button className="carousel-btn prev" onClick={prevSlide}>&#10094;</button>
            <div className="carousel-images">
                {images.map((image, index) => (
                    <img
                        src={image}
                        key={index}
                        alt={`Slide ${index + 1}`}
                        className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
            <button className="carousel-btn next" onClick={nextSlide}>&#10095;</button>
        </div>
    );
};


const Day9 = () => {
    const carouselImages = [

        'https://eduauraapublic.s3.ap-south-1.amazonaws.com/webassets/images/blogs/how-to-improve-coding-skills.jpg',
        'https://www.stellardigital.in/blog/wp-content/uploads/2022/03/What-skills-are-required-to-become-an-efficient-coder-min.jpg',
        'https://helios-i.mashable.com/imagery/articles/01gIa563Hg9IvYRYIP64WQd/hero-image.fill.size_1248x702.v1656434265.jpg',
        'https://cdn.mycplus.com/mycplus/wp-content/uploads/2020/02/programming_tips.jpg',
    ];
    const [cryptoData, setCryptoData] = useState([]);
    const fetchCryptoData = async () => {
        try {
            const res = await axios.get(CRYPTO_API, {
                params: {
                    vs_currency: 'usd',
                    //dont use ids if want to show top coin, use it when you want to show some coins
                    ids: 'bitcoin,gala,ethereum,binancecoin',
                    order: 'market_cap_desc',
                    per_page: 5,
                    page: 1,
                    sparkline: false
                }
            });
            setCryptoData(res.data);
        } catch (error) {
            console.error("Error fetching crypto data", error);
        }
    };

    const [user, setUser] = useState(null);


    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/auth')
        }
    }, [])
    useEffect(() => {

        fecthMyUser();
        fetchCryptoData();
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




    return (


        <div className="container-1">
            <h1>Profile Information</h1>
            <div className="container">
                <div className="left-column">
                    <img className="profile-image" width={200} height={200} src="/photo.png"></img>
                    <div className="info">
                        <center><h2> {user?.first_name} {user?.surname}</h2></center>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Contact:</strong> {user?.phone_number}</p>
                        <marquee><p><strong>Balance:<a id='bl' href="https://www.bcel.com.la/bcelibank/index.jsp"> $828,999.00</a></strong></p></marquee>
                    </div>
                </div>

                <div className="right-column">
                    <h2>Social Media</h2>
                    <div className="social">

                        <img width={50} height={50} src="https://images.vexels.com/media/users/3/223136/isolated/preview/984f500cf9de4519b02b354346eb72e0-facebook-icon-social-media-by-vexels.png"></img>
                        <p><a href="http://www.facebook.com/nustino"> Ntesla</a></p>
                        <img width={50} height={50} src="https://static.vecteezy.com/system/resources/previews/016/716/450/original/tiktok-icon-free-png.png"></img>
                        <p id='tk'><a href="http://www.tiktok.com/@cpnust"> Time Travel</a></p>
                    </div>

                    <div className="real">
                        <h2>Real Contact</h2>
                        <p>SOUTSADA SISOURATH</p>
                        <p>Nustjrx@gmail.com</p>
                        <p>Whatsapp: 020-2266-1181</p>
                        <div id="send-btn">
                            <a href="https://wa.me/8562022661181?text=Hello%20Soutsada" target="_blank">
                                <button>Send Message</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-2">
                <div className="info2">
                    <center><h2>Professional Skill</h2></center>
                    <div className="pro-info"><p><strong>Front-end:</strong> Html, Photoshop CS6, ReactJS</p>
                        <p><strong>Back-end:</strong> PHP, Laravel, MongoDB</p></div>
                    <div className="pro-pic">
                        <img className="qr" height={200} width={200} src="https://images.squarespace-cdn.com/content/v1/6059e881e22c8042fb31c88f/e3a9de00-c0b7-4c92-81ce-6a9f33f95148/Screenshot+2022-11-25+at+14.48.47.png"></img>
                        <ImageCarousel images={carouselImages} />
                    </div></div>
                <div className="crypto-watchlist">
                    <h2>Crypto Watchlist</h2>
                    {cryptoData.map((coin) => (
                        <div key={coin.id} className="crypto-row">
                            <img className="crypto-icon" src={coin.image} alt={`${coin.name} icon`} />
                            <span className="crypto-name">{coin.name}:</span>
                            <span className="crypto-price">${new Intl.NumberFormat().format(coin.current_price)}</span>
                            <span
                                className={`crypto-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                    .container {
                        display: flex;
                        justify-content: space-between;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        background-image: linear-gradient(to bottom, red, blue);
                        box-shadow: 0 0 5px rgba(0,0,0,0.5);
                        border-radius: 20px;
                    }
                        #bl {
                        color:green;
                        }
                        .container-1 h1 {
                        color: white;
                         box-shadow: 0 0 5px rgba(0,0,0,0.5);
                          background-image: linear-gradient(to bottom, #064d1e, #0b8f38);
                        }
        
                    // .left-column, .right-column {
                    //     flex: 5;
                    //     margin: 10px;
                    // }
                    .pro-info{
                    
                    }
                    .pro-pic {
                    display:flex;
                      
                     
                    }
                    .qr {
                    display: flex;
                    border: solid 2px red;
                    border-radius: 20%;
                    margin-right: 20px;
                    }
                    .container-2 {
                        margin-top: 20px;
                        text-align: center;
                    }
                    #tk {
                    color:white;
                    }
                    .profile-image {
                        border-radius: 50%;
                        margin-bottom: 15px;
                        border: solid 5px white;
                    }
        
                    .info, .info2, .real, .crypto-watchlist{
                        padding: 15px;
                        background-color: rgba(255, 255, 255, 0.9);
                        border-radius: 20px;
                        box-shadow: 0 0 5px rgba(0,0,0,0.5);
                        text-align: left;
                        
                    }
                       .crypto-watchlist h2{
                       color: #fc7f03;
                       

                       }
                       .crypto-watchlist {
                       background-color: #332f2b;}

                 .crypto-watchlist {
                    margin-top: 20px;
                    padding: 10px;
                    
                }

                .crypto-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    background-color: rgba(255, 255, 255, 0.8);
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                    border-radius: 2px;
                }

                .crypto-icon {
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                }

                .crypto-name {
                    font-weight: bold;
                    flex: 1;
                }

                .crypto-price {
                    margin-left: 10px;
                    flex: 1;
                }

                .crypto-change {
                    margin-left: auto;
                    font-weight: bold;
                    flex: 1;
                    text-align: right;
                }

                .crypto-change.positive {
                    color: green;
                }

                .crypto-change.negative {
                    color: red;
                }
                    .real h2 {
                    color:red;
                    }
                    .info h2{
                     color: #429ef5;
                    
                    }
                     .info2 h2{
                     color: #064d1e;
                    
                    }
                     .info strong {
                     color:#cf55ed;
                     }
                         .info2 strong {
                     color:#429ef5;
                     }
                    .social {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        padding: 15px;
                        margin: 30px;
                    }
        
                    #send-btn {
                        display: flex;
                        justify-content: center;
                    }
        
                    a {
                        color: white;
                    }
        
                    h1, h2 {
                        text-align: center;
                        color: white;
                    }

                    .carousel {
                    position: relative;
                     width: 100%;
                     max-width: 600px;
                    // margin: 0 auto;
                }

                .carousel-images {
                    position: relative;
                }

                .carousel-image {
                    width: 100%;
                    height: auto;
                    display: none;
                    border-radius:20px;
                    // margin:10px;
                }

                .carousel-image.active {
                    display: block;
                }

                .carousel-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: rgba(0, 0, 0, 0.5);
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    cursor: pointer;
                    font-size: 18px;
                    z-index: 2;
                    transition: background-color 0.3s ease;
                }

                .carousel-btn:hover {
                    background-color: rgba(0, 0, 0, 0.7);
                }

                .prev {
                    left: 10px;
                }

                .next {
                    right: 10px;
                }



                `}</style>
        </div>
    )

}
export default Day9;
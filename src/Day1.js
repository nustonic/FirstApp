import "./App2.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Day1() {
   
    const [search, setSearch] = useState("");
    const [crypto, setCrypto] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);  

   
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();
    
    useEffect(()=>{
      if (!localStorage.getItem('token')){
        navigate('/auth')
      }
    },[])
   
    useEffect(() => {
        Axios.get("https://api.coincap.io/v2/assets")
            .then((res) => {
                setCrypto(res.data.data);  
                setLoading(false);  
            })
            .catch((err) => {
                setError(err.message);  
                setLoading(false);  
            });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = crypto.slice(indexOfFirstItem, indexOfLastItem);

 
    const totalPages = Math.ceil(crypto.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="App">
            <div className="tap-head">
                <img id="img1" src="https://i.pinimg.com/736x/82/1a/26/821a26799dda29716c6e3ba17b22134b.jpg" alt="header" />
                <center>
                <button onClick={()=>{navigate('/converter')}}>Coin Convert</button>
                    <h1>ອັນດັບຫຼຽນ crypto ຍອດນິຍົມ</h1>
                    <input
                        type="text"
                        placeholder="ຄົ້ນຫາ..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </center>
            </div>

          
            {loading && <p>Loading...</p>}

          
            {error && <p>Error: {error}</p>}

         
            {!loading && !error && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <td>Rank</td>
                                <td>Name</td>
                                <td>Symbol</td>
                                <td>Market Cap</td>
                                <td>Price</td>
                                <td>Supply</td>
                                <td>Volume(24hrs)</td>
                            </tr>
                        </thead>
                        <tbody>
                           
                            {currentItems
                                .filter((val) => val.name.toLowerCase().includes(search.toLowerCase()))
                                .map((val) => (
                                    <tr key={val.id}> 
                                        <td className="rank">{val.rank}</td>
                                        <td className="logo">
                                            <a href={val.explorer}>
                                                <img src={`https://assets.coincap.io/assets/icons/${val.symbol.toLowerCase()}@2x.png`} alt="logo" width="30px" />
                                            </a>
                                            <p>{val.name}</p>
                                        </td>
                                        <td className="symbol">{val.symbol}</td>
                                        <td>${new Intl.NumberFormat().format(val.marketCapUsd)}</td>
                                        <td>${Number(val.priceUsd).toFixed(2)}</td>
                                        <td>{new Intl.NumberFormat().format(val.supply)}</td>
                                        <td>{new Intl.NumberFormat().format(val.volumeUsd24Hr)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}


        </div>
    );
}

export default Day1;

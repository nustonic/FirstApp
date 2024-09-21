import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom'; 


const PRODUCTS_API = "https://fakestoreapi.com/products";  // Using Fake Store API
const PRODUCTS_PER_PAGE = 9;
const Day10 = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    const [currentPage, setCurrentPage] = useState(1);
    // Fetch products from API
    const fetchProducts = async () => {
        try {
            const response = await axios.get(PRODUCTS_API);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching products");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Calculate pagination variables
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;






    return (
        <div className="product-page">
            <h1>ລາຍການສິນຄ້າ</h1>
            <Link to="/cart">Go to Cart</Link> 
            <div className="products-container">
                {currentProducts.map((product) => (
                    <div key={product.id} className="product-card" >
                        <img src={product.image} alt={product.title} className="product-image" />
                        <h2>{product.title}</h2>
                        <p id='price'>Price: LAK {new Intl.NumberFormat().format(product.price * 1000)}</p>
                        <p id='des'>{product.description.substring(0, 100)}...</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            {/* Pagination controls */}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>

            </div>
            <style jsx>{`
                .product-page {
                    text-align: center;
                    padding: 20px;
                    max-width: 1200px;   /* Set max width for the entire container */
                    margin: 0 auto;      /* Center the entire container */
                }

                .products-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);  /* 3 items per row */
                    gap: 20px;
                    justify-content: center; /* Ensure the grid is centered */
               
                    }

                .product-card {
                // margin:20px
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    transition: transform 0.3s ease;
                    // width: 100%;  /* Ensure cards take full width */
                    max-width: 400px;  /* Maximum width for the card */
                // }

                .product-card:hover {
                    transform: scale(1.05);
                }

                .product-image {
                    max-width: 100%;
                    height: auto;
                    border-radius: 10px;
                }

                h1 {
                    color: #669cd1;
                    font-weight: bold;
                    text-shadow: 2px 2px #252323;
                }

                h2 {
                    color: #555;
                    font-size:14px
                }

                p {
                    font-size: 18px;
                    color: #777;
                }
                    #des {
                    font-size:12px
                    }
                    #price {
                    color: #0d5975;
                    font-size:14px
                    }
                     .pagination {
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .pagination button {
                    padding: 10px 15px;
                    margin: 0 10px;
                    border: none;
                    background-color: #007bff;
                    color: white;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .pagination button:hover {
                    background-color: #0056b3;
                }

                .pagination button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
            `}</style>
        </div>

    );
};

export default Day10;

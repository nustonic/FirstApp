import { useEffect, useState } from 'react';
import axios from 'axios';

// Fake Store API endpoint
const PRODUCTS_API = "https://fakestoreapi.com/products";
const PRODUCTS_PER_PAGE = 9;

const EcommerceApp = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  // Pagination logic
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

  // Add product to cart
  const addToCart = (product) => {
    const productExists = cart.find((item) => item.id === product.id);

    if (productExists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...productExists, quantity: productExists.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Product preview handler
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="ecommerce-app">
      <h1>Product List</h1>
      
      {/* Product Listing */}
      <div className="products-container">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
            <img src={product.image} alt={product.title} className="product-image" />
            <h2>{product.title}</h2>
            <p>Price: LAK {new Intl.NumberFormat().format(product.price * 1000)}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

      {/* Product Preview Modal */}
      {selectedProduct && (
        <div className="product-preview">
          <div className="preview-content">
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <p>Price: LAK {new Intl.NumberFormat().format(selectedProduct.price * 1000)}</p>
            <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
            <button onClick={() => setSelectedProduct(null)}>Close Preview</button>
          </div>
        </div>
      )}

      {/* Cart Section */}
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? <p>No items in the cart.</p> : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .ecommerce-app {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        .products-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .product-card {
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }

        .product-card:hover {
          transform: scale(1.05);
        }

        .product-image {
          max-width: 100%;
          height: auto;
        }

        .pagination {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pagination button {
          padding: 10px;
          margin: 0 10px;
        }

        .product-preview {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .preview-content img {
          max-width: 100%;
          height: auto;
        }

        .cart {
          margin-top: 30px;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-item img {
          width: 50px;
          height: 50px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default EcommerceApp;

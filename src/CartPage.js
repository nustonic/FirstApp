import { useContext } from 'react';
import { CartContext } from './CartContext';
// import { CartProvider } from './CartContext';  // Correct import statement


const CartPage = () => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);

  const increaseQuantity = (productId) => {
      setCart((prevCart) =>
          prevCart.map((item) =>
              item.id === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
          )
      );
  };

  const decreaseQuantity = (productId) => {
      setCart((prevCart) =>
          prevCart.map((item) =>
              item.id === productId && item.quantity > 1
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
          )
      );
  };


    if (cart.length === 0) {
        return <p>Your cart is empty</p>;
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cart.map((item) => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-image" />
                    <h2>{item.title}</h2>
                    <p>Price: LAK {new Intl.NumberFormat().format(item.price * 1000)}</p>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
            <style jsx>{`
                .cart-page {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .cart-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 20px;
                }

                .cart-image {
                    max-width: 100px;
                    height: auto;
                }

                h1 {
                    color: #333;
                }

                button {
                    background-color: #ff4d4f;
                    color: white;
                    padding: 10px 15px;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
};

export default CartPage;

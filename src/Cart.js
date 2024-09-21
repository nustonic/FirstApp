import { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    if (cart.length === 0) {
        return <p>Your cart is empty</p>;
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.map((item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>Price: LAK {new Intl.NumberFormat().format(item.price * 1000)}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;

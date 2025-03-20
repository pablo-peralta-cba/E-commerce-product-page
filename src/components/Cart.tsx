
interface Item {
    id: number;
    name: string;
    discountPrice: number;
    img: string;
    quantity: number;
  }
  
  interface CartProps {
    cartItems: Item[];
    setCartItems: React.Dispatch<React.SetStateAction<Item[]>>;
  }
  
  const Cart: React.FC<CartProps> = ({ cartItems, setCartItems }) => {
    const removeFromCart = (id: number) => {
      setCartItems(cartItems.filter((item: Item) => item.id !== id));
    };
  
    return (

      <div className="cart-container position-absolute top-8 end-0">
  <div className="p-4 border-bottom">
    <h3 className="text-very-dark-blue fw-bold">Cart</h3>
  </div>

  <div className="p-4">
    {cartItems.length === 0 ? (
      <p className="text-center py-5 text-dark-grayish-blue fw-bold">Your cart is empty.</p>
    ) : (
      <>
        <ul className="list-unstyled mb-3">
          {cartItems.map((item: Item) => (
            <li key={item.id} className="d-flex align-items-center mb-3">
              <div className="rounded overflow-hidden me-3" style={{ width: '48px', height: '48px' }}>
                <img
                  src={item.img}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="w-100 h-100" style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="flex-grow-1">
                <p className="text-dark-grayish-blue text-truncate">{item.name}</p>
                <p className="text-dark-grayish-blue">
                  ${item.discountPrice.toFixed(2)} x {item.quantity} <span className="text-very-dark-blue font-bold">${(item.discountPrice * item.quantity).toFixed(2)}</span>
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove from cart"
                className="bg-transparent border-0 p-0"
              >
                <img src="src/images/icon-delete.svg" alt="Delete" width={14} height={16} />
              </button>
            </li>
          ))}
        </ul>
        <button className="w-100 bg-orange text-very-dark-blue font-bold py-3 rounded hover-opacity-70 transition-opacity border border-transparent fw-bold">
          Checkout
        </button>
      </>
    )}
  </div>
</div>
    );
  };
  
  export default Cart;
  
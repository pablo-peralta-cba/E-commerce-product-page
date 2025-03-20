
import Navbar from './Navbar';

interface Item {
  id: number;
  name: string;
  discountPrice: number;
  img: string;
  quantity: number;
}

interface DisplayProps {
  children: React.ReactNode;
  cartItems: Item[];
  setCartItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const Display: React.FC<DisplayProps> = ({ children, cartItems, setCartItems }) => {
  return (
    <div className='container display-container py-1 min-vh-100 d-flex flex-column'>
      <div className='row'>
      <Navbar cartItems={cartItems} setCartItems={setCartItems} />
      <main className="flex-grow-1">{children}</main>
    </div>
    </div>
  );
};

export default Display;

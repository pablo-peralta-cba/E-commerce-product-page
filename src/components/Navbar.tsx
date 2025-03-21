import React, { useState, useRef, useEffect } from 'react';
import Cart from './Cart';

interface Item {
  id: number;
  name: string;
  discountPrice: number;
  img: string;
  quantity: number;
}

interface NavbarProps {
  cartItems: Item[];
  setCartItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const Navbar: React.FC<NavbarProps> = ({ cartItems, setCartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <header id='menuNavbar' className="position-relative px-4 py-3 header-custom">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2 gap-md-4">
          <button
            className="d-block d-md-none closedMenuBtn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <img src="/icon-menu.svg" alt="Menu" width={16} height={15} />
          </button>

          <div className='brandName' >
        <a href="/">
          <img src="/logo.svg" alt="Sneakers" width={138} height={20} />
        </a>
      </div>
       
          <nav className="menu-header d-none d-md-flex align-items-center">
            <ul className="d-flex gap-3" style={{ height: '100%' }}>
              {["Collections", "Men", "Women", "About", "Contact"].map((item) => (
                <li key={item} className="navItem" onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'orange' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent' }}>
                  <a className='menuLink' href="#" onMouseEnter={(e) => { e.currentTarget.style.color = 'black' }} onMouseLeave={(e) => { e.currentTarget.style.color = 'darkgray' }}>{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="d-flex align-items-center gap-5">
          <div className="position-relative" ref={cartRef}>
            <button id='btnCart'
              className="position-relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
              aria-label="Toggle cart"
            >
              {cartItems.length > 0 && (
                <span className="cart-qty position-absolute top-0 end-0 bg-warning text-white small rounded-pill px-2 py-1">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
              <img src="/icon-cart.svg" alt="Cart" width={22} height={20} />
            </button>

            {isCartOpen && <Cart cartItems={cartItems} setCartItems={setCartItems} />}
          </div>

          <button id='avatar' className="rounded-circle overflow-hidden avatar-button" onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'orange' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent' }}>
            <img src="/image-avatar.png" alt="Avatar" className="w-100 h-100 object-cover" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu position-fixed top-0 start-0 w-100 h-100 z-5">
          <div className="bg-white h-100 w-50 p-4">
            <button
              className="mb-3 close-menu"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <img src="/icon-close.svg" alt="Close" width={14} height={15} />
            </button>

            <ul className="d-flex flex-column gap-3 fw-bold menu-list">
              {["Collections", "Men", "Women", "About", "Contact"].map((item) => (
                <li className='navItem' key={item}><a className='menuLink ' href="#">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

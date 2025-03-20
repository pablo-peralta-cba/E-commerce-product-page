import { useState } from 'react';

// Asegúrate de que el tipo CartItem coincida con el tipo Item
interface Item {
  id: number;
  name: string;
  discountPrice: number;
  img: string;
  quantity: number;
}

interface ProductDataProps {
  product: {
    id: number;
    brand: string;
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    discountPerc: number;
    images: { thumbnail: string }[];
  };
  setCartItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ProductData: React.FC<ProductDataProps> = ({ product, setCartItems }) => {
  const [quantity, setQuantity] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    if (quantity === 0) return;

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        return [...prevItems, {
          id: product.id,
          name: product.name,
          discountPrice: product.discountPrice || product.price,
          img: product.images[0].thumbnail,
          quantity
        }];
      }
    });

    setQuantity(0);
  };

  return (
    <div className="px-3 py-3 col-md-11 ps-md-0">
      <p className="text-dark-grayish-blue fw-bold text-uppercase small tracking-wider mb-3">
        {product.brand}
      </p>

      <h1 className="text-very-dark-blue display-5 fw-bold mb-3 mb-md-5">
        {product.name}
      </h1>

      <p className="text-dark-grayish-blue mb-3 mb-md-4">
        {product.description}
      </p>

      <div className="mb-3 mb-md-4">
        <div className="d-flex align-items-center gap-3 mb-1">
          <span className="discount-price text-very-dark-blue fw-bold">
            ${product.discountPrice?.toFixed(2) || product.price.toFixed(2)}
          </span>

          {product.discountPerc && (
            <span className="bg-dark text-white fw-bold px-2 py-1 rounded">
              {product.discountPerc}%
            </span>
          )}
        </div>

        {product.discountPrice && (
          <p className="text-grayish-blue fw-bold text-decoration-line-through">
            ${product.price.toFixed(2)}
          </p>
        )}
      </div>

      <div className="d-md-flex gap-md-3">
        <div className="d-flex align-items-center justify-content-between bg-light-grayish-blue p-2 w-100 mb-3 mb-md-0 w-md-33 rounded">
        {/* mb-3 mb-md-0 w-md-33 */}
          <button 
            className="p-3 border-0 bg-transparent" 
            onClick={decreaseQuantity}
            aria-label="Decrease quantity"
          >
            <img src="src/images/icon-minus.svg" alt="Minus" width={12} height={4} />
          </button>

          <span className="fw-bold">{quantity}</span>

          <button 
            className="p-3 border-0 bg-transparent" 
            onClick={increaseQuantity}
            aria-label="Increase quantity"
          >
            <img src="src/images/icon-plus.svg" alt="Plus" width={12} height={12} />
          </button>
        </div>

        <button 
          className="w-100 w-md-66 bg-orange text-very-dark-blue fw-bold py-3 rounded d-flex align-items-center justify-content-center gap-3 hover-opacity-70 transition-opacity shadow-lg shadow-orange-30 border border-transparent"
          onClick={addToCart}
        >
          <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" 
              fill="hsl(220, 13%, 13%)" 
              fillRule="nonzero"
            />
          </svg>
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductData;

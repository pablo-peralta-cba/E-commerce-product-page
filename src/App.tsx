import { useState } from 'react'
import Display from './components/Display';
import Lightbox from './components/Lightbox';
import ProductData from './components/ProductData';


interface Item {
  id: number;
  name: string;
  discountPrice: number;
  img: string
  quantity: number
}


function App() {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const product = {
    id: 1,
    brand: 'Sneaker Company',
    name: 'Fall Limited Edition Sneakers',
    description: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they will withstand everything the weather can offer.',
    price: 250.00,
    discountPrice: 125.00,
    discountPerc: 50,
    images: [
      {
        src: '/image-product-1.jpg',
        thumbnail: '/image-product-1-thumbnail.jpg'
      },
      {
        src: '/image-product-2.jpg',
        thumbnail: '/image-product-2-thumbnail.jpg'
      },
      {
        src: '/image-product-3.jpg',
        thumbnail: 'src/images/image-product-3-thumbnail.jpg'
      },
      {
        src: '/image-product-4.jpg',
        thumbnail: '/image-product-4-thumbnail.jpg'
      }
    ]
  };
  return (
    <div className='App'>
       <Display cartItems={cartItems} setCartItems={setCartItems}>

      <div className="container py-5 px-4 mt-4">
 
     
        <div className="row">
        <div className="col-12 col-md-7 d-flex flex-column h-100 pe-0">
    <Lightbox images={product.images} />
  </div>
  <div className="col-12 col-md-5 d-flex flex-column h-100 ps-0 pe-0">
    <ProductData product={product} setCartItems={setCartItems} />
  </div>
        </div>
      </div>
    </Display>
    </div>
  )
}

export default App

import { useState } from 'react';
interface Image {
  src: string;
  thumbnail: string;
}

const Lightbox = ({ images }: { images: Image[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openLightbox = () => {
    if (window.innerWidth >= 768) {
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <div className="lightbox col-md-8">
         {/* Mobile Gallery */}
        <div className="d-md-none">
          <div className="w-100 position-relative rounded-3 overflow-hidden" style={{ aspectRatio: '1/1'  }}>
            <img 
              src={images[currentIndex].src} 
              alt={`Product image ${currentIndex + 1}`} 
              className="object-fit-cover w-100 h-100 position-absolute"
            />
          </div>
          
          <button 
            className="position-absolute start-0 top-50 translate-middle-y bg-white rounded-circle d-flex align-items-center justify-content-center mobile-nav-button"
            onClick={handlePrevious}
            aria-label="Previous image"
            style={{ zIndex: 1 }} 
          >
            <img src="/icon-previous.svg" alt="Previous" width={12} height={18} />
          </button>
          
          <button 
            className="position-absolute end-0 top-50 translate-middle-y bg-white rounded-circle d-flex align-items-center justify-content-center mobile-nav-button"
            onClick={handleNext}
            aria-label="Next image"
          >
            <img src="/icon-next.svg" alt="Next" width={12} height={18} />
          </button>
        </div>
        
        {/* Desktop Gallery */}
        <div className="d-none d-md-block mx-2">
          <div 
            className="w-100 position-relative rounded-4 overflow-hidden cursor-pointer mb-4"
            style={{aspectRatio: '1/1' }}
            onClick={openLightbox}
          >
            <img 
              src={images[currentIndex].src} 
              alt={`Product image ${currentIndex + 1}`} 
              className="object-fit-cover position-absolute w-100 h-100"
            />
          </div>
          
          <div className="row row-cols-8 gx-0">
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`col position-relative rounded-4 overflow-hidden cursor-pointer m-1 border-2 border-transparent thumbnail-image ${currentIndex === index ? 'selected' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-white overlay"></div>
                <img 
                  src={image.thumbnail} 
                  alt={`Thumbnail ${index + 1}`} 
                  width={88} 
                  height={88} 
                  className="object-fit-cover w-100 h-100 rounded-4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
    {/* Lightbox */}
    {lightboxOpen && (
  <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-75 d-flex align-items-center justify-content-center z-5">
    <div className="col-lg-4 mx-auto my-5 px-3">
      <div className="d-flex justify-content-end mb-4">
        <button
          onClick={() => setLightboxOpen(false)}
          aria-label="Close lightbox"
          className="lightbox-close"
        >
          <img
            src="/icon-close.svg"
            alt="Close"
            width={20}
            height={20}
            className="lightbox-close-icon"
          />
        </button>
      </div>

      <div className="position-relative mb-4" style={{ margin: 'auto' }}>
        <div className="position-relative rounded-4 overflow-hidden" style={{ aspectRatio: '1/1' }}>
          <img
            src={images[currentIndex].src}
            alt={`Product image ${currentIndex + 1}`}
            className="object-cover w-100 h-100"
          />
        </div>

        <button
          className="position-absolute start-0 top-50 translate-middle-y bg-white rounded-circle d-flex align-items-center justify-content-center lightbox-nav-button"
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          <img src="/icon-previous.svg" alt="Previous" width={12} height={18} />
        </button>

        <button
          className="position-absolute end-0 top-50 translate-middle-y bg-white rounded-circle d-flex align-items-center justify-content-center lightbox-nav-button"
          onClick={handleNext}
          aria-label="Next image"
        >
          <img src="/icon-next.svg" alt="Next" width={12} height={18} />
        </button>
      </div>

      <div className="row row-cols-8 gx-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`col position-relative rounded-5 overflow-hidden m-1 cursor-pointer thumbnail-image ${currentIndex === index ? 'selected' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-white overlay"></div>
            <img
              src={image.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              width={88}
              height={88}
              className="object-cover w-100 h-100"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Lightbox;
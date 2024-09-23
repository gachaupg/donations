import React, { useState } from 'react';
import './Gallery.css';

// Import images
import image1 from '../assets/Image_1.jpeg';
import image2 from '../assets/image_2.jpeg';
import image3 from '../assets/image_3.jpeg';
import image4 from '../assets/image_4.jpeg';
import image5 from '../assets/image_5.jpeg';
import image6 from '../assets/image_6.jpeg';
import image7 from '../assets/image_7.jpeg';
import image8 from '../assets/image_8.jpeg';
import image9 from '../assets/image_9.jpeg';
import image10 from '../assets/image_10.jpeg';

const images = [
  { src: image1, description: 'Reuben Wairicu Foundation' },
  { src: image2, description: 'Reuben Wairicu Foundation' },
  { src: image3, description: 'Reuben Wairicu Foundation' },
  { src: image4, description: 'Reuben Wairicu Foundation' },
  { src: image5, description: 'Reuben Wairicu Foundation' },
  { src: image6, description: 'Reuben Wairicu Foundation' },
  { src: image7, description: 'Reuben Wairicu Foundation' },
  { src: image8, description: 'Reuben Wairicu Foundation' },
  { src: image9, description: 'Reuben Wairicu Foundation' },
  { src: image10, description: 'Reuben Wairicu Foundation' },
];

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openLightbox = (image) => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setCurrentImage(null);
  };

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div className="gallery-item" key={index} onClick={() => openLightbox(image.src)}>
          <img src={image.src} alt="" className="gallery-image" />
          <div className="image-info">
            <p>{image.description}</p>
          </div>
        </div>
      ))}
      {isOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <img src={currentImage} alt="Current" />
        </div>
      )}
    </div>
  );
};

export default Gallery;

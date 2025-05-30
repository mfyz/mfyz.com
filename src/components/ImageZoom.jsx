import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function ImageZoom({ src, alt, width, height, class: className, maxZoomWidth, isPrerendered, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const dialogRef = useRef(null);

  const toggleZoom = () => {
    if (isZoomed) {
      dialogRef.current?.close();
      // If this component was dynamically loaded and has an onClose callback, call it
      if (isPrerendered && onClose) {
        onClose();
      }
    } else {
      dialogRef.current?.showModal();
    }
    setIsZoomed(!isZoomed);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
      // If this component was dynamically loaded and has an onClose callback, call it
      if (isPrerendered && onClose) {
        onClose();
      }
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      const handleClose = () => {
        setIsZoomed(false);
        // If this component was dynamically loaded and has an onClose callback, call it
        if (isPrerendered && onClose) {
          onClose();
        }
      };
      
      dialog.addEventListener('close', handleClose);
      
      // Clean up event listener
      return () => {
        dialog.removeEventListener('close', handleClose);
      };
    }
  }, []);

  // Calculate maximum width for zoomed image
  const zoomedMaxWidth = maxZoomWidth ? `${maxZoomWidth}px` : '95vw';

  // Calculate aspect ratio
  const aspectRatio = width / height;

  return (
    <>
      {/* Only render the button if this is not being prerendered */}
      {!isPrerendered && (
        <button
          onClick={toggleZoom}
          className="w-full cursor-zoom-in"
          aria-label="Click to zoom image"
        >
          <img 
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`transition-transform hover:scale-105 ${className || ''}`}
          />
        </button>
      )}
      
      {/* For prerendered mode, automatically show the dialog */}
      {isPrerendered && (
        useEffect(() => {
          // Auto-open the dialog when component mounts in prerendered mode
          setTimeout(() => {
            if (dialogRef.current) {
              dialogRef.current.showModal();
              setIsZoomed(true);
            }
          }, 0);
        }, [])
      )}
      <dialog 
        ref={dialogRef}
        className="fixed inset-0 z-50 bg-transparent p-4 backdrop:bg-black/80 overflow-hidden"
      >
        <div className="flex h-full w-full items-center justify-center">
          <div 
            className="relative"
            style={{ 
              width: zoomedMaxWidth, 
              maxWidth: zoomedMaxWidth, 
              maxHeight: '95vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <button
              className="h-full w-full"
              onClick={toggleZoom}
              onKeyDown={handleKeyPress}
              aria-label="Close zoomed image"
            >
              <img 
                src={src}
                alt={alt}
                className="cursor-zoom-out"
                style={{ 
                  width: '100%',
                  maxWidth: '100%', 
                  maxHeight: '95vh',
                  objectFit: 'contain',
                  background: 'transparent'
                }}
              />
            </button>
            <span
              className="btn-icon absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 z-10"
              aria-hidden="true"
              onClick={toggleZoom}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}

ImageZoom.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  class: PropTypes.string,
  maxZoomWidth: PropTypes.number,
  isPrerendered: PropTypes.bool,
  onClose: PropTypes.func
};

ImageZoom.defaultProps = {
  isPrerendered: false,
  onClose: null
};
import React, { useState, useCallback } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc, 
  className = '', 
  loading = 'lazy',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError && fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
  }, [hasError, fallbackSrc, imageSrc]);

  const handleLoad = useCallback(() => {
    setHasError(false);
  }, []);

  // If no src and no fallback, don't render anything
  if (!imageSrc && !fallbackSrc) {
    return null;
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};

export default ImageWithFallback;
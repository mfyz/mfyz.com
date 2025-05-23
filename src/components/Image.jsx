import PropTypes from 'prop-types';

export default function Image({ src, alt, width, height, class: className, center }) {
  if (center) {
    className += " mx-auto";
  }
  
  return (
      <div className="img-wrapper">
        <img 
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      </div>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  class: PropTypes.string,
  center: PropTypes.bool
}
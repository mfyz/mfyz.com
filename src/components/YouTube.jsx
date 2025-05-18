import PropTypes from 'prop-types';

export default function YouTube({ id, startAt }) {
  const startParam = startAt ? '?start=' + startAt : '';
  const url = `https://www.youtube.com/embed/${id}${startParam}`;
  return (
    <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden my-8">
      <iframe
        src={url}
        border="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}

YouTube.propTypes = {
  id: PropTypes.string.isRequired,
  startAt: PropTypes.number,
};
import React from "react";
import PropTypes from "prop-types";

const characterDetails = {
  felix: {
    imageURL: "/characters/felix.jpg",
    name: "Felix",
  },
  bender: {
    imageURL: "/characters/bender.jpg",
    name: "Bender",
  }
};

const Message = ({
  character = "felix",
  children,
  direction = "left",
  compact = false,
}) => {
  const { imageURL, name } = characterDetails[character];

  return (
    <div
      data-direction={direction}
      className={`flex w-full gap-2 data-[direction=right]:flex-row-reverse ${
        compact ? 'mt-4' : 'mt-10'
      }`}
    >
      <img
        className="not-prose size-12 flex-shrink-0 rounded-full bg-slate-300 object-cover mt-8"
        src={imageURL}
        alt={`${name} profile-pic`}
        height={50}
        width={50}
        loading="lazy"
      />

      <div className="overflow-hidden">
        <p
          data-direction={direction}
          className="not-prose m-1 text-sm text-gray-500 data-[direction=right]:text-right"
        >
          {name}
        </p>
        <div
          data-direction={direction}
          className="w-full max-w-2xl rounded-2xl bg-gray-400/20 data-[direction=right]:bg-blue-400/20 p-6 [&>*]:!mt-0"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  character: PropTypes.oneOf(['felix', 'bender']),
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['left', 'right']),
  compact: PropTypes.bool,
};

export default Message;

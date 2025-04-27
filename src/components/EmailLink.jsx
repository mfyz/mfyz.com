import { useState } from 'react';
import PropTypes from 'prop-types';

export default function EmailLink({ email = "apps@mfyz.com" }) {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <button
      onClick={() => setShowEmail(true)}
      className="btn-secondary inline-flex items-center gap-2"
    >
      <span>✉️</span>
      {showEmail ? email : "Contact via Email"}
    </button>
  );
}

EmailLink.propTypes = {
  email: PropTypes.string
};
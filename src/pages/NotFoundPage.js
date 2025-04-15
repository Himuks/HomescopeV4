import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">Go back to Homepage</Link> {/* Link back home */}
    </div>
  );
};

export default NotFoundPage;
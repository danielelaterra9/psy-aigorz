import React from 'react';

const Logo = ({ className = "", size = 48 }) => {
  return (
    <img 
      src="https://customer-assets.emergentagent.com/job_aigroz-psy/artifacts/n2exae4u_image.png"
      alt="Sophie Aigroz - Psychologue FSP"
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
      data-testid="logo"
    />
  );
};

export default Logo;

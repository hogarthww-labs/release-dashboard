import React from 'react';

const Navbar = ({ setPage, page }) => {
  const trClass = page === 'tickets' ? 'active' : ''
  const vrClass = page === 'versions' ? 'active' : ''
  return ( 
    <nav>
      <button className={trClass} onClick={() => setPage('tickets')}>Ticket Releases</button>
      <button className={vrClass} onClick={() => setPage('versions')}>Versioned Releases</button>
    </nav>
  );
}
 
export default Navbar;
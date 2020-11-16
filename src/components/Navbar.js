import React from 'react';

const Navbar = ({ setPage, page, query, setQuery }) => {
  const trClass = page === 'tickets' ? 'active' : ''
  const vrClass = page === 'versions' ? 'active' : ''
  return ( 
    <div className="navBar">
      <nav>
          <button className={trClass} onClick={() => setPage('tickets')}>Ticket Releases</button>
          <button className={vrClass} onClick={() => setPage('versions')}>Versioned Releases</button>
      </nav>
    </div>
  );
}
 
export default Navbar;
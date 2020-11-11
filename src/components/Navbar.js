import React from 'react';

const Navbar = ({ setPage }) => {
  return ( 
    <nav>
      <button onClick={() => setPage('tickets')}>Ticket Releases</button>
      <button onClick={() => setPage('versions')}>Versioned Releases</button>
    </nav>
  );
}
 
export default Navbar;
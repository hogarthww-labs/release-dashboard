import React, { useState } from 'react';

import { SearchBox } from './Common';

const Navbar = ({ setPage, page, query, setQuery }) => {
  const trClass = page === 'tickets' ? 'active' : ''
  const vrClass = page === 'versions' ? 'active' : ''
  return ( 
    <div class="navBar">
      <SearchBox query={query} setQuery={setQuery} />
      <nav>
        <div className="navButtons">
          <button className={trClass} onClick={() => setPage('tickets')}>Ticket Releases</button>
          <button className={vrClass} onClick={() => setPage('versions')}>Versioned Releases</button>
        </div>      
      </nav>
    </div>
  );
}
 
export default Navbar;
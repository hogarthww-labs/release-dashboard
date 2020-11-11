import React, { useState } from 'react';

import { ReactQueryDevtools } from 'react-query-devtools';

import Navbar from './components/Navbar';
import TicketReleases from './components/TicketReleases';
import VersionedReleases from './components/VersionedReleases';


function App() {
  let [page, setPage] = useState('planets');

  return (
    <>
      <div className="App">
      <h1>Dashboard</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          { page === 'versions' ? <VersionedReleases /> : <TicketReleases /> }
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;

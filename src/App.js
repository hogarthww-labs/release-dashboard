import React, { useState } from 'react';

import { ReactQueryDevtools } from 'react-query-devtools';

import Navbar from './components/Navbar';
import TicketReleases from './components/TicketReleases';
import VersionedReleases from './components/VersionedReleases';

const Page = ({page}) => {
  return page === 'versions' ? <VersionedReleases /> : <TicketReleases />
}


function App() {
  let [page, setPage] = useState('versions');
  console.log({page})

  return (
    <>
      <div className="App">
      <h1>Dashboard</h1>
        <Navbar setPage={setPage} page={page} />
        <div className="content">
          <Page page={page} />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;

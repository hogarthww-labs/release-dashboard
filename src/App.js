import React, { useState } from 'react';

import { ReactQueryDevtools } from 'react-query-devtools';

import Navbar from './components/Navbar';
import { Sidenav } from './components/Sidenav';
import TicketReleases from './components/TicketReleases';
import VersionedReleases from './components/VersionedReleases';

const Page = ({page, query}) => {
  return page === 'versions' ? <VersionedReleases query={query} /> : <TicketReleases query={query} />
}


function App() {
  let [page, setPage] = useState('versions');
  const [ query, setQuery ] = useState(""); 

  return (
    <>
      <div className="App">
      <h2 className="title">Dashboard</h2>
        <Navbar setPage={setPage} page={page} />
        <div className="content">
          <Page page={page} query={query} />
        </div> 
        <div className="sidenav">
          <Sidenav query={query} setQuery={setQuery} />
        </div>       
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

import { usePaginatedQuery, useQueryCache } from 'react-query';

import { SearchBox } from './Common';
import { TicketRelease } from './TicketRelease';

const fetchTicketReleases = async (key, page, query) => {
  // const res = await fetch(`${host}/ticket-releases/?page=${page}`);
  const res = await fetch('data/tickets.json', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  })
  const data = await res.json()  
  const filteredData = query ? data.filter(item => item.id.includes(query)) : data
  return filteredData;
}

const TicketReleases = () => {
  const [ page, setPage ] = useState(1);
  const [ query, setQuery ] = useState("");
  const { 
    resolvedData, 
    latestData, 
    status 
  } = usePaginatedQuery(['TicketReleases', page, query], fetchTicketReleases);
  const queryCache = useQueryCache()

  useEffect(() => {
    queryCache.invalidateQueries('VersionedReleases')
    return () => {
      // console.log('refetch', { query })
    }
  }, [query, queryCache])


  return (
    <div>
      <h2>Ticket Releases</h2>

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <>
          <SearchBox query={query} setQuery={setQuery} />
          <div>
            { resolvedData.map(release => <TicketRelease key={release.id} release={release} /> ) }
          </div>
          <div className="pagination">
            <button 
              onClick={() => setPage(old => Math.max(old - 1, 1))} 
              disabled={page === 1}>
              Previous Page
            </button>
            <span>{ page }</span>
            <button 
              onClick={() => setPage(old => (!latestData || !latestData.next ? old : old + 1))} 
              disabled={!latestData || !latestData.next}>
              Next page
            </button>
          </div>
        </>
      )} 
    </div>
  );
}
 
export default TicketReleases;
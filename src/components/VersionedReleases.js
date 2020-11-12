import React, { useEffect, useState } from 'react';

import { usePaginatedQuery, useQueryCache } from 'react-query';

import { SearchBox } from './Common';
import { VersionRelease } from './VersionRelease';

const fetchVersionedReleases = async (key, page, query) => {
  // const res = await fetch(`${host}/versioned-releases/?page=${page}`);
  const res = await fetch('data/versions.json', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  })  
  const data = await res.json()  
  console.log({query, data})
  const filteredData = query ? data.filter(item => item.id.includes(query)) : data
  return filteredData;
}

const VersionedReleases = () => {
  const [ page, setPage ] = useState(1);
  const [ query, setQuery ] = useState("");
  const { 
    resolvedData, 
    latestData, 
    status 
  } = usePaginatedQuery(['VersionedReleases', page, query], fetchVersionedReleases);
  const queryCache = useQueryCache()

  console.log({resolvedData})

  useEffect(() => {
    queryCache.invalidateQueries('VersionedReleases')
    return () => {
      // console.log('refetch', { query })
    }
  }, [query, queryCache])

  return (
    <div>
      <h2>Versions</h2>
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
            { resolvedData.map(release => <VersionRelease key={release.id} release={release} /> ) }
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
 
export default VersionedReleases;
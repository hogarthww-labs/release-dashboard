import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css'
import { usePaginatedQuery, useQueryCache } from 'react-query';

import { Pagination } from './Common';
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
  const filteredData = query ? data.filter(item => item.id.includes(query)) : data
  return filteredData;
}


const VersionedReleases = ({query}) => {
  const [ page, setPage ] = useState(1);
  const { 
    resolvedData, 
    latestData, 
    status 
  } = usePaginatedQuery(['VersionedReleases', page, query], fetchVersionedReleases);
  const queryCache = useQueryCache()

  useEffect(() => {
    queryCache.invalidateQueries('VersionedReleases')
    return () => {
      // console.log('refetch', { query })
    }
  }, [query, queryCache])

  return (
    <div>
      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <div className="releases">  
          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            { resolvedData.map(release => <VersionRelease key={release.id} release={release} /> ) } 
          </Masonry>            
          <Pagination setPage={setPage} page={page} latestData={latestData} />
        </div>
      )} 
    </div>
  );
}
// 

export default VersionedReleases;
import React, { useEffect, useState } from 'react';

import { usePaginatedQuery, useQueryCache } from 'react-query';

import { Pagination, SearchBox } from './Common';
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

const ReleasesList = ({list }) => <div>
  { list.map(release => <VersionRelease key={release.id} release={release} /> ) }
</div>


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
        <>      
          <div className="releases">
            <ReleasesList list={resolvedData} />
          </div>
          <Pagination setPage={setPage} page={page} latestData={latestData} />
        </>
      )} 
    </div>
  );
}
 
export default VersionedReleases;
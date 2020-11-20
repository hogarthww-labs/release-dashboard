import React, { useEffect, useState } from 'react';

import { usePaginatedQuery, useQueryCache } from 'react-query';

import { ReleasesList } from './Common';
import { VersionRelease } from './VersionRelease';
import { useStore } from './store';

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
  const addRelease = useStore(state => state.addRelease) 
  const removeRelease = useStore(state => state.removeRelease) 

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

  const releases = { list: resolvedData, addRelease, removeRelease, ReleaseItem: VersionRelease }
  const pagination = { page, setPage, latestData }
  const releaseProps = {
    releases,
    pagination
  }

  return (
    <div>
      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}
    
      {status === 'success' && <ReleasesList {...releaseProps} />} 
    </div>
  );
}
// 

export default VersionedReleases;
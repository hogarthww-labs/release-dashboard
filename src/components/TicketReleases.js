import React, { useState, useEffect } from 'react';

import { usePaginatedQuery, useQueryCache } from 'react-query';

import { ReleasesList} from './Common';
import { TicketRelease } from './TicketRelease';
import { fetchTicketReleases } from './fetch';
import { useStore } from './store';

const TicketReleases = ({query }) => {
  const [ page, setPage ] = useState(1);
  const addRelease = useStore(state => state.addRelease) 
  const removeRelease = useStore(state => state.removeRelease) 

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

  const releases = { list: resolvedData, addRelease, removeRelease, ReleaseItem: TicketRelease }
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
 
export default TicketReleases;
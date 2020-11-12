import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css'
import { usePaginatedQuery, useQueryCache } from 'react-query';

import { Pagination} from './Common';
import { TicketRelease } from './TicketRelease';
import { useStore } from './store';
import { fetchTicketReleases } from './fetch';

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
            { resolvedData.map(release => <TicketRelease key={release.id} release={release} addRelease={addRelease} removeRelease={removeRelease} /> ) } 
          </Masonry>            
          <Pagination setPage={setPage} page={page} latestData={latestData} />
        </div>
      )} 
    </div>
  );
}
 
export default TicketReleases;
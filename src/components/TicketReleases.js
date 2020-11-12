import React, { useState, useEffect } from 'react';

import { usePaginatedQuery, useQueryCache } from 'react-query';

import { SearchBox } from './Common';
import { TicketRelease } from './TicketRelease';
import create from 'zustand'

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

const DependenciesForReleases = ({selectedReleases}) => {
  const allDependenciesMap = Object.keys(selectedReleases).reduce((acc, key) => {
    const release = selectedReleases[key]
    const dependencyMap = release.dependencies.reduce((acc, dep) => {
      acc[dep.id] = dep
      return acc
    }, {})
    const ids = release.dependencies.map(dep => dep.id)
    ids.map(id => {
      const tag = dependencyMap[id].tag
      acc[id] = !acc[id] || tag > acc[id] ? tag : acc[id]
    })    
    return acc
  }, {})
  const allDependencyNames = Object.keys(allDependenciesMap)
  return <ul>{allDependencyNames.map((key) => {
    return <li>{key} {allDependenciesMap[key]}</li>
  })}</ul>
}

const SelectedReleaseNames = ({selectedReleases}) => Object.keys(selectedReleases).join(', ')

const CombinedReleases = ({selectedReleases}) => <>
  <h3>Combined Releases</h3>
  <SelectedReleaseNames selectedReleases={selectedReleases} />
  <h5>Dependency requirements</h5>
  <DependenciesForReleases selectedReleases={selectedReleases} />
</>

const CombineReleases = ({selectedReleases}) => {
  const keys = Object.keys(selectedReleases)  
  return keys.length > 0 ? <CombinedReleases selectedReleases={selectedReleases} /> : 'no releases selected'
}

const Pagination = ({setPage, page, latestData}) => <div className="pagination">
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

const ReleasesList = ({list, addRelease, removeRelease}) => <div>
  { list.map(release => <TicketRelease key={release.id} release={release} addRelease={addRelease} removeRelease={removeRelease} /> ) }
</div>

const useStore = create(set => ({
  releases: {},
  addRelease: (id, release) => set(state => {
    const newReleases = {
      ...state.releases,
      [id]: release
    }    
    console.log('add', id, { newReleases })
    return { 
      releases: newReleases
    }
  }),
  removeRelease: (id) => set(state => {
    const newReleases = {...state.releases }
    delete newReleases[id]
    console.log('remove', id, { newReleases })
    return { 
      releases: newReleases,
    }
  }),
}))


const TicketReleases = () => {
  const [ page, setPage ] = useState(1);
  const [ query, setQuery ] = useState(""); 
  const addRelease = useStore(state => state.addRelease) 
  const removeRelease = useStore(state => state.removeRelease) 
  const selectedReleases = useStore(state => state.releases)

  const { 
    resolvedData, 
    latestData, 
    status 
  } = usePaginatedQuery(['TicketReleases', page, query], fetchTicketReleases);
  const queryCache = useQueryCache()

  console.log({selectedReleases})

  useEffect(() => {
    queryCache.invalidateQueries('VersionedReleases')
    return () => {
      // console.log('refetch', { query })
    }
  }, [query, queryCache])


  return (
    <div>
      <h2>Tickets</h2>
      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <>
          <SearchBox query={query} setQuery={setQuery} />
          <CombineReleases selectedReleases={selectedReleases} />
          <ReleasesList list={resolvedData} addRelease={addRelease} removeRelease={removeRelease} />
          <Pagination setPage={setPage} page={page} latestData={latestData} />
        </>
      )} 
    </div>
  );
}
 
export default TicketReleases;